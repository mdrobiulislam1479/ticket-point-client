import { Star } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CustomerFeedback() {
  const sliderRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Guest user",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5,
      text: "TicketPoint made my travel booking so easy and reliable. Highly recommend!",
    },
    {
      id: 2,
      name: "Guest user",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      rating: 5,
      text: "The online ticketing process is fast and the customer support is excellent.",
    },
    {
      id: 3,
      name: "Guest user",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      rating: 5,
      text: "I love how I can check ticket prices and routes in one place with TicketPoint. Very convenient!",
    },
    {
      id: 4,
      name: "Guest user",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop",
      rating: 5,
      text: "Affordable tickets and smooth booking experience on TicketPoint. I travel often!",
    },
    {
      id: 5,
      name: "Guest user",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      rating: 5,
      text: "Great platform with clear ticket info and convenient payment options on TicketPoint.",
    },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Initialize Swiper
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js";
    script.async = true;

    script.onload = () => {
      new window.Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
      });
    };

    document.head.appendChild(script);

    // Add Swiper CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css";
    document.head.appendChild(link);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#00adb5] to-[#364153] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-accent">
            What Our Customers Say About{" "}
            <span className="bg-linear-to-r from-[#00adb5] to-[#364153] bg-clip-text text-transparent">
              TicketPoint
            </span>
          </h2>
          <p className="text-accent text-lg max-w-2xl mx-auto">
            Join thousands of satisfied travelers who trust TicketPoint for
            their journey
          </p>
        </div>
      </div>
      <div className="container w-full">
        <div className="relative">
          {/* Swiper Container */}
          <div ref={sliderRef} className="swiper">
            <div className="swiper-wrapper">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="swiper-slide">
                  <div className="bg-primary rounded-2xl shadow-md shadow-secondary border border-secondary p-8 flex flex-col items-center text-center h-80">
                    {/* Avatar with online status */}
                    <div className="relative mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-100"
                      />
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-accent mb-3">
                      {testimonial.name}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-accent/90 text-sm leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="swiper-button-prev w-12! h-12! bg-white! rounded-full! shadow-md! after:text-base! after:text-gray-600! after:font-bold! hover:shadow-lg! transition-all!"></div>
          <div className="swiper-button-next  w-12! h-12! bg-white! rounded-full! shadow-md! after:text-base! after:text-gray-600! after:font-bold! hover:shadow-lg! transition-all!"></div>

          {/* Pagination */}
          <div className="swiper-pagination relative! mt-8!"></div>
        </div>
      </div>
    </div>
  );
}
