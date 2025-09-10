import Navbar from "../components/Navbar";
import GalaxyBackground from "../components/GalaxyBackground";

export default function Services() {
  return (
    <>
      <GalaxyBackground />
      <Navbar />
      <main className="max-w-5xl mx-auto py-16 px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-cyan-400/10 p-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-cyan-400">
            Our Services
          </h1>
          <p className="text-lg text-white/80 font-light mb-8">
            We offer a range of services to help your business grow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white/10 rounded-xl p-8 shadow-lg border border-cyan-400/10 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl">
              <svg
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4 text-cyan-400"
              >
                <path
                  d="M12 2v20M2 12h20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-white">
                Custom Software
              </h3>
              <p className="text-white/70 text-center">
                Tailored web, mobile, and cloud solutions to fit your business
                needs.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 shadow-lg border border-cyan-400/10 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl">
              <svg
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4 text-cyan-400"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-white">
                AI & Automation
              </h3>
              <p className="text-white/70 text-center">
                Leverage AI and automation to streamline operations and boost
                productivity.
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-8 shadow-lg border border-cyan-400/10 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl">
              <svg
                width="40"
                height="40"
                fill="none"
                viewBox="0 0 24 24"
                className="mb-4 text-cyan-400"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2 text-white">
                Consulting
              </h3>
              <p className="text-white/70 text-center">
                Expert advice to help you navigate digital transformation and
                tech strategy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
