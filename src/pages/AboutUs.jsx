import { Link } from "react-router";
import { MoveRight, Star, Users, Zap, ShieldCheck } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-base-100 transition-colors duration-300">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="badge badge-secondary badge-outline py-4 px-6 mb-6 font-semibold tracking-widest animate-fade-in">
              SINCE 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-base-content leading-tight mb-8">
              Booking Made <br />
              <span className="text-secondary italic">Effortless.</span>
            </h1>
            <p className="max-w-2xl text-lg text-base-content/70 leading-relaxed mb-10">
              Ticket Point is a premium digital gateway designed to connect
              travel enthusiasts with seamless transport solutions across the
              globe.
            </p>
            <div className="flex gap-4">
              <Link
                to="/all-tickets"
                className="btn btn-secondary btn-lg px-8 rounded-full btn-glow"
              >
                Explore Tickets <MoveRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary blur-[120px] rounded-full"></div>
        </div>
      </section>

      {/* --- BENTO GRID FEATURES --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Story Card */}
          <div className="md:col-span-2 p-10 rounded-3xl bg-base-200 border border-base-300 flex flex-col justify-between group">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Our Visionary Approach
              </h2>
              <p className="text-base-content/70 text-lg leading-relaxed mb-6">
                We didn't just want to build a ticket app. We wanted to build a
                reliability engine. Every line of code at Ticket Point is
                written to ensure your journey starts without a single hiccup.
              </p>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-4 border-base-200 bg-secondary"
                  ></div>
                ))}
              </div>
              <p className="text-sm font-medium text-base-content/60 italic">
                Trusted by 50,000+ travelers monthly
              </p>
            </div>
          </div>

          {/* Icon Feature Card */}
          <div className="p-10 rounded-3xl bg-secondary text-secondary-content flex flex-col justify-between items-start shadow-xl shadow-secondary/20">
            <Zap size={40} fill="currentColor" />
            <div>
              <h3 className="text-2xl font-bold mt-8 mb-2">Instant Sync</h3>
              <p className="opacity-80">
                Book on mobile, check-in on desktop. Your tickets follow you
                everywhere instantly.
              </p>
            </div>
          </div>

          {/* Small Bento Cards */}
          <div className="p-8 rounded-3xl bg-base-300/30 flex flex-col items-center text-center">
            <ShieldCheck size={32} className="text-secondary" />
            <h4 className="font-bold mt-4">100% Secure</h4>
          </div>
          <div className="p-8 rounded-3xl border border-base-300 flex flex-col items-center text-center">
            <Users size={32} className="text-secondary" />
            <h4 className="font-bold mt-4">Expert Support</h4>
          </div>
          <div className="p-8 rounded-3xl bg-base-300/30 flex flex-col items-center text-center">
            <Star size={32} className="text-secondary" />
            <h4 className="font-bold mt-4">Top Rated</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
