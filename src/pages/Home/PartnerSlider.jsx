import Marquee from "react-fast-marquee";

const partners = [
  { name: "Green Line", logo: "" },
  { name: "Hanif Enterprise", logo: "" },
  { name: "Bangladesh Railway", logo: "" },
  { name: "Biman Bangladesh", logo: "" },
  { name: "US-Bangla Airlines", logo: "" },
  { name: "Novoair", logo: "" },
  { name: "Green Line", logo: "" },
  { name: "Hanif Enterprise", logo: "" },
  { name: "Bangladesh Railway", logo: "" },
  { name: "Biman Bangladesh", logo: "" },
  { name: "US-Bangla Airlines", logo: "" },
  { name: "Novoair", logo: "" },
];

const PartnerSlider = () => {
  return (
    <section className="py-10 bg-base-100 border-y border-base-200 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-base-content/30">
          Official Transport Partners
        </p>
      </div>

      <Marquee
        gradient={true}
        gradientColor="var(--b1)"
        gradientWidth={150}
        speed={50}
        pauseOnHover={true}
        className="flex items-center"
      >
        {partners.map((partner, index) => (
          <div
            key={index}
            className="flex items-center justify-center mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 md:h-14 w-auto object-contain"
              title={partner.name}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default PartnerSlider;
