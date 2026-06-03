# Performance Optimizations Log

Audit and optimization pass targeting Lighthouse Performance on mobile (~41) and desktop (~60).
Goal: reduce Total Blocking Time, JS Execution Time, Unused JavaScript, and Image payload.

---

## Audit Findings (Before)

### Critical

| # | Issue | Severity |
|---|-------|----------|
| 1 | `HomeWithLoader` statically imported all 6 below-fold sections — Firebase, Lottie, Three.js, GSAP all landed in the initial JS bundle | Critical |
| 2 | `ServicesSection` used a static (non-dynamic) import of `GalaxyBackground` — pulled Three.js into the synchronous bundle | Critical |
| 3 | `ContactSection` statically imported `lottie-react` AND bundled `contact-email.json` at build time | Critical |
| 4 | `FooterSection` statically imported `lottie-react` AND bundled `footer.json` at build time | Critical |
| 5 | Up to 3 simultaneous Three.js WebGL contexts running at once (HeroSection + Earth + ServicesSection), each with its own rAF loop | High |
| 6 | `GalaxyBackground` rAF loop kept running when the tab was hidden or canvas was scrolled out of view | High |
| 7 | `humble-bg.png` — 1 MB PNG loaded as a CSS background-image, bypassing Next.js image optimization | High |
| 8 | `logo.png` — 190 KB PNG served via plain `<img>` in Navbar and Footer (no WebP, no lazy control) | Medium |
| 9 | `AboutSection` fetched `Robot.json` on immediate mount with no IntersectionObserver delay | Medium |
| 10 | `TestimonialsSection` used `<img>` for avatar images — no WebP, no lazy loading, no fixed dimensions | Low |
| 11 | `FooterSection` imported `Instagram` and `Linkedin` icons from lucide-react while the links were commented out | Low |

### Image Audit (public/)

| File | Size | Status |
|------|------|--------|
| `about/About.gif` | 6.3 MB | Services/About page — not homepage. Recommend Lottie JSON or WebP video |
| `services/Web.gif` | 5.6 MB | Services page only. Same recommendation |
| `services/Cloud.gif` | 2.7 MB | Services page only |
| `Home/humble-bg.png` | 1.0 MB | **Fixed** — now served via next/image as AVIF/WebP |
| `services/AI.gif` | 841 KB | Services page only |
| `services/Support.gif` | 722 KB | Services page only |
| `Home/Robot.gif` | 685 KB | Not used directly; Robot.json Lottie is used instead |
| `Home/logo.png` | 190 KB | **Fixed** — now served via next/image |

---

## Changes Applied

### 1. Dynamic imports for all below-fold sections — `HomeWithLoader.tsx`

**Problem:** All 6 sections (AboutSection, ServicesSection, HumbleAdvantage, ContactSection, TestimonialsSection, FooterSection) were statically imported. This meant Firebase, Lottie, Three.js, and GSAP-ScrollTrigger were all parsed and executed on initial page load even though none of these sections are visible above the fold.

**Fix:**
```diff
- import AboutSection from "./AboutSection";
- import ServicesSection from "./ServicesSection";
- import TestimonialsSection from "./TestimonialsSection";
- import FooterSection from "./FooterSection";
- import HumbleAdvantage from "./HumbleAdvantage";
- import ContactSection from "./ContactSection";

+ const AboutSection = dynamic(() => import("./AboutSection"), { loading: () => null });
+ const ServicesSection = dynamic(() => import("./ServicesSection"), { loading: () => null });
+ const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), { loading: () => null });
+ const FooterSection = dynamic(() => import("./FooterSection"), { loading: () => null });
+ const HumbleAdvantage = dynamic(() => import("./HumbleAdvantage"), { loading: () => null });
+ const ContactSection = dynamic(() => import("./ContactSection"), { loading: () => null });
```

**Impact:** Each section becomes a separate JS chunk fetched after the initial paint. Reduces initial JS parse/execute time by an estimated 40–60%. This is the single highest-impact change.

---

### 2. Dynamic GalaxyBackground in ServicesSection — `ServicesSection.tsx`

**Problem:** `GalaxyBackground` was a static import in ServicesSection. Three.js (~600 KB minified) was synchronously bundled with the section even though the section is mobile-only and below the fold.

**Fix:**
```diff
- import GalaxyBackground from "./GalaxyBackground";

+ const GalaxyBackground = dynamic(() => import("./GalaxyBackground"), {
+   ssr: false,
+   loading: () => null,
+ });
```

**Impact:** Three.js removed from synchronous bundle for this section.

---

### 3. Lazy Lottie + runtime JSON in ContactSection — `ContactSection.tsx`

**Problem:** `lottie-react` (~150 KB gzipped) was statically imported, and `contact-email.json` was bundled at build time — both added to the initial page bundle despite ContactSection being far below the fold.

**Fix:**
```diff
- import Lottie from "lottie-react";
- import contact from "@/public/Home/contact-email.json";

+ const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

  // Inside component:
+ const [contactData, setContactData] = useState<object | null>(null);
+ useEffect(() => {
+   fetch("/Home/contact-email.json")
+     .then((r) => r.json())
+     .then(setContactData)
+     .catch(() => {});
+ }, []);
```

**Impact:** `lottie-react` and the Lottie JSON removed from initial bundle.

---

### 4. Lazy Lottie + runtime JSON in FooterSection — `FooterSection.tsx`

**Problem:** Same pattern as ContactSection. `lottie-react` and `footer.json` were statically bundled.

**Fix:**
```diff
- import Lottie from "lottie-react";
- import footer from "@/public/photos/footer.json";
- import { Instagram, Linkedin } from "lucide-react"; // ← icons were never rendered

+ const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

  // Inside component:
+ const [footerData, setFooterData] = useState<object | null>(null);
+ useEffect(() => {
+   fetch("/photos/footer.json").then(r => r.json()).then(setFooterData).catch(() => {});
+ }, []);
```

Also replaced `<img>` logo with `next/image` and removed the dead `Instagram`/`Linkedin` icon imports (links were commented out but icons were still bundled).

**Impact:** `lottie-react`, JSON, and ~2 KB of unused icon code removed from bundle.

---

### 5. GalaxyBackground — visibility pausing + mobile GPU reduction — `GalaxyBackground.tsx`

**Problem:** The Three.js `requestAnimationFrame` loop ran continuously regardless of whether the canvas was visible on screen or the browser tab was in the background. On a page with multiple GalaxyBackground instances this wastes significant CPU/GPU.

**Fix — Pause when tab is hidden:**
```typescript
const onVisibilityChange = () => {
  document.hidden ? stop() : start();
};
document.addEventListener("visibilitychange", onVisibilityChange);
```

**Fix — Pause when scrolled out of viewport:**
```typescript
const io = new IntersectionObserver(
  ([entry]) => { entry.isIntersecting ? start() : stop(); },
  { rootMargin: "50px" }
);
io.observe(canvas);
```

**Fix — Cap pixel ratio on mobile:**
```diff
- renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
+ const isMobile = window.innerWidth < 768;
+ renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
```

**Fix — Fewer stars on mobile:**
```diff
- const starCount = 1000;
+ const starCount = isMobile ? 400 : 1000;
```

**Impact:** Eliminates wasted GPU draw calls when background/off-screen. Mobile reduces vertex processing by ~60% and fill-rate by ~44%.

---

### 6. Logo with next/image in Navbar — `Navbar.tsx`

**Problem:** Plain `<img>` tag for the logo — no WebP delivery, no size hints, no lazy-loading control.

**Fix:**
```diff
- import Image from "next/image"; // was missing

- <img src="/Home/logo.png" alt="Humble Solutions logo" className="h-10 w-auto ml-5" />

+ <Image
+   src="/Home/logo.png"
+   alt="Humble Solutions logo"
+   width={160}
+   height={40}
+   className="ml-5 h-10 w-auto"
+   priority
+ />
```

`priority` prevents the logo from being lazy-loaded since it is always in the initial viewport.

**Impact:** Logo delivered as AVIF/WebP. `priority` eliminates any LCP delay from the logo.

---

### 7. humble-bg.png via next/image — `HumbleAdvantage.tsx`

**Problem:** 1 MB PNG loaded as a `style={{ backgroundImage }}` CSS property — bypasses the Next.js image optimizer entirely, no WebP conversion, no lazy loading.

**Fix:** Replaced the CSS background with a positioned `<Image fill>` element:
```diff
- <section style={{ backgroundImage: "url('/Home/humble-bg.png')" }}>
+ <section className="relative overflow-hidden">
+   <Image
+     src="/Home/humble-bg.png"
+     alt=""
+     fill
+     className="object-cover object-center -z-10"
+     loading="lazy"
+     aria-hidden="true"
+   />
```

**Impact:** ~1 MB PNG served as AVIF (~150 KB) or WebP (~250 KB) — estimated 700–850 KB saved per page load.

---

### 8. IntersectionObserver for Robot.json fetch — `AboutSection.tsx`

**Problem:** `Robot.json` (Lottie animation data) was fetched on component mount unconditionally, wasting network bandwidth before the user has scrolled anywhere near the About section.

**Fix:**
```diff
- useEffect(() => {
-   fetch("/Robot.json").then(r => r.json()).then(setRobotData);
- }, []);

+ useEffect(() => {
+   const observer = new IntersectionObserver(([entry]) => {
+     if (entry.isIntersecting) {
+       observer.disconnect();
+       fetch("/Robot.json").then(r => r.json()).then(setRobotData).catch(() => {});
+     }
+   }, { rootMargin: "300px" });
+   if (sectionRef.current) observer.observe(sectionRef.current);
+   return () => observer.disconnect();
+ }, []);
```

**Impact:** Fetch deferred until user is 300px above the section. Saves ~100–200 ms of network contention during initial load.

---

### 9. next/image for testimonial avatars — `TestimonialsSection.tsx`

**Problem:** Avatar images rendered with plain `<img>` — no fixed dimensions (causes CLS), no WebP, no lazy loading.

**Fix:**
```diff
- <img src={testimonial.img} className="w-12 h-12 ..." />
+ <Image src={testimonial.img} width={48} height={48} className="..." />
```

**Impact:** Eliminates CLS from avatar images. WebP delivery on supported browsers.

---

### 10. next.config.ts — image format and remote pattern config

**Problem:** Next.js image optimizer was not configured to produce AVIF/WebP, and the `placehold.co` domain was not in the allowed remote patterns.

**Fix:**
```diff
  const nextConfig = {
-   eslint: {},
+   images: {
+     formats: ["image/avif", "image/webp"],
+     remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
+   },
  };
```

**Impact:** All `next/image` usage across the site now produces AVIF (50% smaller than WebP) with WebP as fallback. Applies globally to logo, background, avatars.

---

## Estimated Lighthouse Score Change

| Metric | Before | After (estimated) |
|--------|--------|-------------------|
| Mobile Performance | ~41 | ~60–70 |
| Desktop Performance | ~60 | ~75–85 |
| Total Blocking Time | Very High | Reduced 40–60% |
| JS Execution Time | High | Reduced 35–50% |
| Unused JavaScript | High | Significantly reduced |
| Image payload | ~1.2 MB | ~200–350 KB |
| LCP | Moderate | Improved |

---

## Remaining Recommendations (Not Applied)

These require more invasive changes or offline tooling:

| Item | Recommendation |
|------|---------------|
| `about/About.gif` (6.3 MB) | Convert to Lottie JSON or WebP video — GIF is the worst format for this use case |
| `services/Web.gif` (5.6 MB) | Same — use `<video autoplay loop muted playsinline>` with WebM source |
| `services/Cloud.gif` (2.7 MB) | Same |
| `GooeyNav` inline `<style>` | Extract to a CSS module or `globals.css` to avoid style recalculation on each render |
| `TypingText` typing loop | Each character triggers a `setState` — consider a canvas-based or CSS approach if TBT remains high after other fixes |
| `FeaturesSection` | Statically imports two Lottie animations + a GIF — convert to the same lazy-fetch pattern used in ContactSection/FooterSection |
| `humble-bg.png` source file | Re-export as WebP from design tool to eliminate the PNG entirely |
| Star count on desktop | Could reduce from 1000 → 600 for a further ~40% GPU reduction with minimal visual difference |
