import {
  Shield,
  DollarSign,
  Headphones,
  MousePointer,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Reliable Service",
      description:
        "We ensure safe and timely travel for all our passengers with 99.8% on-time record.",
      icon: Shield,
      color: "from-[#00adb5] to-cyan-600",
      bgColor: "bg-[#00adb5]/10",
      iconBg: "bg-[#00adb5]/20",
    },
    {
      title: "Affordable Tickets",
      description:
        "Competitive pricing without compromising on comfort and quality service.",
      icon: DollarSign,
      color: "from-emerald-500 to-[#00adb5]",
      bgColor: "bg-emerald-500/10",
      iconBg: "bg-emerald-500/20",
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated support team is always available to assist you anytime, anywhere.",
      icon: Headphones,
      color: "from-[#364153] to-[#00adb5]",
      bgColor: "bg-[#364153]/10",
      iconBg: "bg-[#364153]/20",
    },
    {
      title: "Easy Booking",
      description:
        "Book your tickets in just 3 clicks with our intuitive and simple interface.",
      icon: MousePointer,
      color: "from-[#00adb5] to-[#364153]",
      bgColor: "bg-[#00adb5]/10",
      iconBg: "bg-[#00adb5]/20",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#00adb5] to-[#364153] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <Sparkles className="w-4 h-4" />
            Our Advantages
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-accent">
            Why Choose{" "}
            <span className="bg-linear-to-r from-[#00adb5] via-[#364153] to-[#00adb5] bg-clip-text text-transparent">
              Us?
            </span>
          </h2>
          <p className="text-accent text-lg max-w-2xl mx-auto">
            Experience the best travel booking service with unmatched benefits
            and premium features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div key={idx} className="group relative">
                {/* Card */}
                <div
                  className={`relative bg-primary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full border border-secondary hover:border-transparent overflow-hidden`}
                >
                  {/* Background linear on hover */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Decorative corner */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${feature.color} opacity-10 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500`}
                  ></div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${feature.iconBg} group-hover:scale-110 transition-transform duration-500 relative`}
                    >
                      <IconComponent
                        className={`w-8 h-8 bg-linear-to-br ${feature.color} bg-clip-text`}
                        strokeWidth={2.5}
                      />
                      {/* Icon glow effect */}
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                      ></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold mb-3 text-accent group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#00adb5] group-hover:to-[#364153] group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-accent/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Check icon */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <CheckCircle
                      className={`w-6 h-6 bg-linear-to-br ${feature.color} bg-clip-text text-transparent`}
                    />
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-linear-to-r ${feature.color} w-0 group-hover:w-full transition-all duration-500`}
                  ></div>
                </div>

                {/* Floating card effect */}
                <div
                  className={`absolute inset-0 bg-linear-to-r ${feature.color} opacity-0 group-hover:opacity-100 rounded-2xl blur-sm -z-10 transition-opacity duration-500`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-8 bg-primary px-8 py-4 rounded-2xl shadow-lg border border-secondary">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#00adb5] to-cyan-600 border-2 border-primary hidden md:flex"></div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#364153] to-[#00adb5] border-2 border-primary hidden md:flex"></div>
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-emerald-500 to-[#00adb5] border-2 border-primary hidden md:flex"></div>
              </div>
              <div className="text-left ml-2">
                <p className="text-sm font-semibold text-accent">
                  50,000+ Happy Travelers
                </p>
                <p className="text-xs text-accent">
                  Join our growing community
                </p>
              </div>
            </div>
            <div className="h-12 w-px bg-secondary"></div>
            <div className="text-left">
              <p className="text-2xl font-bold bg-linear-to-r from-[#00adb5] to-[#364153] bg-clip-text text-transparent">
                4.9/5
              </p>
              <p className="text-xs text-accent">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
