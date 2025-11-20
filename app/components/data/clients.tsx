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
      "Humble Solutions completely transformed our digital presence. Their innovative approach and deep technical expertise are second to none. We're seeing results we never thought possible.",
    name: "Sarah Lynn",
    title: "CEO of Innovate Inc.",
    img: "https://placehold.co/100x100/4299e1/FFFFFF/png?text=SL",
  },
  {
    quote:
      "Working with their team was a dream. They are incredibly responsive, bursting with creativity, and they genuinely understood our vision and needs from day one.",
    name: "Michael Chen",
    title: "Founder of Creative Co.",
    img: "https://placehold.co/100x100/38b2ac/FFFFFF/png?text=MC",
  },
  {
    quote:
      "The level of professionalism and dedication is outstanding. They delivered a robust solution on time and on budget, exceeding all our expectations.",
    name: "David Rodriguez",
    title: "CTO at TechForward",
    img: "https://placehold.co/100x100/9f7aea/FFFFFF/png?text=DR",
  },
  {
    quote:
      "Their data-driven strategies provided us with crucial insights that have directly impacted our bottom line. An invaluable partner for any growing business.",
    name: "Emily Carter",
    title: "Marketing Director, Growth Solutions",
    img: "https://placehold.co/100x100/ed8936/FFFFFF/png?text=EC",
  },
];
