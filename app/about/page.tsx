import Navbar from "../components/Navbar";

import HomeScrollReveal from "../components/HomeScrollReveal";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto py-16 px-4 relative z-10">
        <HomeScrollReveal y={60} duration={1.1} once={false}>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-cyan-400/10 p-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-cyan-400">
              About Us
            </h1>
            <p className="text-lg text-white/80 font-light mb-8">
              Learn more about our team and mission.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-8">
              <HomeScrollReveal
                y={40}
                duration={1.1}
                once={false}
                className="w-full md:w-1/2"
              >
                <div className="bg-white/10 rounded-xl p-8 shadow-lg border border-cyan-400/10 flex flex-col items-center w-full">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Our Mission
                  </h3>
                  <p className="text-white/70 text-center">
                    Empowering businesses and people through innovative
                    technology solutions.
                  </p>
                </div>
              </HomeScrollReveal>
              <HomeScrollReveal
                y={40}
                duration={1.1}
                once={false}
                className="w-full md:w-1/2"
              >
                <div className="bg-white/10 rounded-xl p-8 shadow-lg border border-cyan-400/10 flex flex-col items-center w-full">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Our Team
                  </h3>
                  <p className="text-white/70 text-center">
                    A passionate group of experts in AI, cloud, and web
                    development.
                  </p>
                </div>
              </HomeScrollReveal>
            </div>
          </div>
        </HomeScrollReveal>
      </main>
    </>
  );
}
