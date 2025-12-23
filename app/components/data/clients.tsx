// data/clients.ts
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  img: string;
}

export const testimonialsData: Testimonial[] = [
  {
    quote:
      "Investing in Humble solutions was worth it! I'm glad I found the perfect tech partners who helped bring my vision to life. I simply explained my bookkeeping process for cylinder management and how I wanted my application to look and function like. Humble Solutions understood the task on the first go and developed such an incredible application that I can't imagine a more efficient way to manage cylinders! Now, I am able to upscale my cylinder distribution as now I know I have track of every cylinder that I have!",
    name: "Sarah Lynn",
    title: "Owner of Gobind Traders",
    img: "https://placehold.co/100x100/4299e1/FFFFFF/png?text=SL",
  },
  {
    quote:
      "I have always wanted to expand my jewelry business by opening multiple branches, just like major brands such as Tanishq and Bluestone. When I outlined my requirement for a mobile application similar to Tanishq's, Humble Solutions assured me that they would deliver an app that was even better and they truly did. Unlike large brands that require an entire in-house development team to manage their applications, I now have a super-efficient and easy-to-use admin panel. This allows me to seamlessly handle my app, store inventory, and billing, all at the same time. All thanks to Humble solutions.",
    name: "Gagan Verma",
    title: "Owner of Gagan Jewellers",
    img: "https://placehold.co/100x100/38b2ac/FFFFFF/png?text=MC",
  },
  {
    quote:
      "I never imagined that my complex business transactions could be automated with a single entry, until I discovered Humble Solutions. Their transparency and quality of work truly impressed me. Based on the application's complexity, I initially estimated it would take at least two months to develop. However, not only did they commit to delivering it within one month, but they also fulfilled that promise.",
    name: "Pukhrajdeep Singh Makkar",
    title: "Owner of Aromex",
    img: "https://placehold.co/100x100/9f7aea/FFFFFF/png?text=DR",
  },
];
