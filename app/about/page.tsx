import Navbar from "../components/Navbar";
import GalaxyBackground from "../components/GalaxyBackground";
import AboutSection from "../components/AboutSection";
import ProfileCard from "./ProfileCard";
import FooterSection from "../components/FooterSection";

export default function About() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 via-black to-black">
      <GalaxyBackground />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* Sleek hero */}
        <section className="bg-black/30 backdrop-blur-lg border border-cyan-400/8 rounded-3xl p-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Humble Solutions
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-2xl">
                We build elegant, reliable software and cloud systems that help
                teams move faster. Design-forward, pragmatic, and focused on
                measurable outcomes.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold shadow hover:brightness-95 transition"
                  href="/services"
                >
                  Our Services
                </a>
                <a
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/10 text-white/90 hover:bg-white/5 transition"
                  href="#about"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="w-full sm:w-80 lg:w-96 mx-auto">
              <div className="rounded-2xl p-4 bg-gradient-to-br from-cyan-400/6 to-blue-500/6 border border-cyan-400/6 shadow-xl">
                <div className="p-2 bg-black/20 rounded-xl">
                  <ProfileCard
                    avatarUrl={`https://picsum.photos/seed/profile/800/800`}
                    miniAvatarUrl={`https://picsum.photos/seed/profile-mini/80/80`}
                    name="Humble Solutions"
                    title="Design & Engineering"
                    handle="humble-solutions"
                    status="Available"
                    contactText="Get in touch"
                    showUserInfo={true}
                    enableTilt={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse AboutSection (3D canvas + blurb) */}
        <div className="mt-12 rounded-full">
          <AboutSection />
        </div>

        {/* Feature cards */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-full">
          <div className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-lg">
            <h4 className="text-cyan-300 font-semibold mb-2">Product Design</h4>
            <p className="text-white/80">
              UX-led design, prototyping, and research.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-lg">
            <h4 className="text-cyan-300 font-semibold mb-2">
              Cloud & Platform
            </h4>
            <p className="text-white/80">
              Secure, cost-efficient cloud systems that scale.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/3 border border-white/6 backdrop-blur-lg">
            <h4 className="text-cyan-300 font-semibold mb-2">AI & Data</h4>
            <p className="text-white/80">
              Practical ML and data pipelines to unlock insights.
            </p>
          </div>
        </section>

        {/* Timeline / placeholder for future content */}
        <section className="mt-12 p-8 rounded-2xl bg-black/20 border border-white/6">
          <h3 className="text-2xl font-bold text-white">Our Journey</h3>
          <p className="mt-3 text-white/80">
            From consulting to product development — a short timeline of
            milestones will go here.
          </p>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
