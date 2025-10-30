import Navbar from "../components/Navbar";
import PortfolioGrid from "./PortfolioGrid";
import GalaxyBackground from "../components/GalaxyBackground";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen">
      {/* animated galaxy canvas (absolute, pointer-events-none) */}
      <GalaxyBackground />

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-6xl mx-auto py-16 px-4">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-cyan-400/10 p-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-cyan-400">
                Portfolio
              </h1>
              <p className="text-lg text-white/80 font-light">
                Check out some of our recent projects and case studies.
              </p>
            </div>

            <PortfolioGrid />
          </div>
        </main>
      </div>
    </div>
  );
}
