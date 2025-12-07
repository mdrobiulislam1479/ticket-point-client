import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const slides = [
    {
      img: "https://i.ibb.co.com/HL7wbYFY/ai-generated-landing-a-plane-against-a-golden-sky-at-sunset-passenger-aircraft-flying-up-in-sunset-l.jpg",
      title: "Book Your Journey Easily",
      text: "Fast, Safe & Reliable Online Ticket Booking.",
    },
    {
      img: "https://i.ibb.co.com/Dm6vNKS/063-Elektrobus01-feb23488.jpg",
      title: "Comfortable Bus Experience",
      text: "Enjoy modern AC buses with premium comfort.",
    },
    {
      img: "https://i.ibb.co.com/KgNxYCq/traveling-abroad-with-your-family.png",
      title: "Safe & Secure Travel",
      text: "Your safety is our first priority.",
    },
  ];

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] pt-5">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full rounded-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              <img
                src={slide.img}
                className="w-full h-full object-cover rounded-xl"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent flex flex-col justify-end items-center md:items-start pb-10 px-6 md:px-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
                  {slide.title}
                </h1>
                <p className="text-lg text-gray-200 mt-3 w-full md:w-1/2 text-center md:text-left">
                  {slide.text}
                </p>

                <button className="btn mt-5 text-white bg-secondary border-none px-6 w-40">
                  Book Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
