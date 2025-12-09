import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const CustomerFeedback = () => {
  const feedbacks = [
    {
      name: "Rahim Ahmed",
      role: "Frequent Traveler",
      comment:
        "TicketPoint made my travel booking so easy and reliable. Highly recommend!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahim",
      rating: 5,
      linear: "from-[#00adb5] to-cyan-600",
    },
    {
      name: "Sabrina Akter",
      role: "Business Traveler",
      comment:
        "The online ticketing process is fast and the customer support is excellent.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sabrina",
      rating: 5,
      linear: "from-emerald-500 to-[#00adb5]",
    },
    {
      name: "Jahid Hossain",
      role: "Tourist",
      comment:
        "I love how I can check ticket prices and routes in one place with TicketPoint.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jahid",
      rating: 5,
      linear: "from-[#364153] to-[#00adb5]",
    },
    {
      name: "Nusrat Jahan",
      role: "Student Traveler",
      comment:
        "Affordable tickets and smooth booking experience on TicketPoint. I travel often!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nusrat",
      rating: 5,
      linear: "from-[#00adb5] to-[#364153]",
    },
    {
      name: "Shakib Khan",
      role: "Business Traveler",
      comment:
        "Booking tickets with TicketPoint has never been easier. Excellent service!",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shakib",
      rating: 5,
      linear: "from-cyan-600 to-[#00adb5]",
    },
    {
      name: "Mousumi Begum",
      role: "Tourist",
      comment:
        "Great platform with clear ticket info and convenient payment options on TicketPoint.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mousumi",
      rating: 5,
      linear: "from-[#00adb5] to-emerald-500",
    },
  ];

  return (
    <section className="py-16">
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

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {feedbacks.map((fb, idx) => (
            <SwiperSlide key={idx} className="!w-[300px]">
              <div
                className={`p-6 rounded-2xl shadow-lg text-center bg-linear-to-br ${fb.linear} text-white`}
              >
                <img
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-white"
                />
                <p className="mb-4">"{fb.comment}"</p>
                <div className="flex justify-center mb-2">
                  {Array(fb.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current text-yellow-300"
                      />
                    ))}
                </div>
                <h3 className="font-bold text-lg">{fb.name}</h3>
                <p className="text-sm">{fb.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerFeedback;
