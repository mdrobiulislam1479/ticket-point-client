import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router";

const routes = [
  {
    id: 1,
    from: "Dhaka",
    to: "Cox's Bazar",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/e2/f8/43/longest-sea-beach-in.jpg?w=1100&h=1100&s=1",
    price: 700,
  },
  {
    id: 2,
    from: "Dhaka",
    to: "Sylhet",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1e/4a/33/pangthumai-waterfall.jpg?w=1200&h=700&s=1",
    price: 300,
  },
  {
    id: 3,
    from: "Chattogram",
    to: "Dhaka",
    image:
      "https://content.r9cdn.net/rimg/dimg/c9/06/8d4fe0d8-city-28030-164fcc85915.jpg?width=1366&height=768&xhint=1477&yhint=1081&crop=true",
    price: 350,
  },
  {
    id: 4,
    from: "Khulna",
    to: "Barishal",
    image:
      "https://orientecotourism.com/wp-content/uploads/2022/05/Barisal-floating-market-guava-1024x768.jpg",
    price: 250,
  },
];

const PopularRoutes = () => {
  const navigate = useNavigate();

  const handleRouteClick = (from, to) => {
    // Encodes the string to handle spaces or special characters
    navigate(
      `/all-tickets?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}`
    );
  };

  return (
    <section className="pt-20 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black text-base-content mb-4 tracking-tight">
              Popular{" "}
              <span className="text-secondary italic">Destinations.</span>
            </h2>
            <p className="text-base-content/60 text-lg">
              The most traveled routes in Bangladesh. Book your seat in seconds.
            </p>
          </div>
          <Link
            to={"/all-tickets"}
            className="btn btn-ghost text-secondary font-bold gap-2 hover:bg-secondary/10"
          >
            View All Routes <IoArrowForward />
          </Link>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl shadow-base-300"
              onClick={() => handleRouteClick(route.from, route.to)}
            >
              {/* Image Overlay */}
              <img
                src={route.image}
                alt={route.to}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-xs font-black uppercase tracking-widest text-secondary mb-2">
                  Route
                </p>
                <h3 className="text-2xl font-bold mb-1">
                  {route.from} → {route.to}
                </h3>
                <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">
                    Starts from{" "}
                    <span className="text-xl font-bold">৳{route.price}</span>
                  </span>
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                    <IoArrowForward size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
