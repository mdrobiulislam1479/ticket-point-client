import { TCard } from "../../components/TCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";

const AdvertiseTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/advertised-tickets`
      );
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
    <div>
      {tickets?.length === 0 ? (
        ""
      ) : (
        <>
          {/* Header Scroll Animation */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-accent">
                Advertised{" "}
                <span className="bg-linear-to-r from-[#00adb5] to-[#364153] bg-clip-text text-transparent italic">
                  Tickets.
                </span>
              </h2>
              <p className="text-accent text-lg max-w-2xl mx-auto">
                Explore popular tickets chosen specially for you.
              </p>
            </div>
          </motion.div>

          {/* Cards Grid Scroll Animation */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {isLoading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <SkeletonCard key={i} />
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {tickets?.map((ticket) => (
                  <motion.div key={ticket._id} variants={itemVariants}>
                    <TCard ticket={ticket} />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AdvertiseTickets;
