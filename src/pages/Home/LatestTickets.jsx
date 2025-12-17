import { TCard } from "../../components/TCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { motion } from "framer-motion";

const LatestTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latest-ticket"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/latest-ticket`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Header with scroll animation */}
      <motion.div
        className="max-w-7xl mx-auto px-4 mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-accent">
            Latest{" "}
            <span className="bg-linear-to-r from-[#00adb5] to-[#364153] bg-clip-text text-transparent">
              Tickets
            </span>
          </h2>
          <p className="text-accent text-lg max-w-2xl mx-auto">
            Check out the newest tickets and start planning your journey
          </p>
        </div>
      </motion.div>

      {/* Cards scroll animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {tickets?.map((ticket) => (
          <motion.div
            key={ticket._id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <TCard ticket={ticket} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LatestTickets;
