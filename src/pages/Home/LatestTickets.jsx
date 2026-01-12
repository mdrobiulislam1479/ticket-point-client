import { TCard } from "../../components/TCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import SkeletonCard from "../../components/skeleton/SkeletonCard";

const LatestTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latest-ticket"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/latest-ticket`);
      return res.data;
    },
  });

  // Parent Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Child Variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-base-100 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-base-content">
            Latest <span className="text-secondary italic">Tickets.</span>
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto font-medium">
            Check out the newest tickets and start planning your journey
          </p>
        </motion.div>

        {/* Grid Container with Variants */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {isLoading
            ? [...Array(6)].map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <SkeletonCard />
                </motion.div>
              ))
            : tickets?.map((ticket) => (
                <motion.div key={ticket._id} variants={itemVariants}>
                  <TCard ticket={ticket} />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTickets;
