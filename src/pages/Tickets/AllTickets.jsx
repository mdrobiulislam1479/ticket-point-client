import { TCard } from "../../components/TCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AllTickets = () => {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [transport, setTransport] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["all-tickets", from, to, transport, sort, page],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/all-tickets`, {
        params: { from, to, transport, sort, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container px-4 mt-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-accent">
          All{" "}
          <span className="bg-linear-to-r from-[#00adb5] to-[#364153] bg-clip-text text-transparent">
            Tickets
          </span>
        </h2>
        <p className="text-accent text-lg">
          Find the perfect ticket for your next journey.
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="bg-primary p-6 rounded-xl shadow mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="From"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            className="input input-bordered"
          />

          <input
            type="text"
            placeholder="To"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            className="input input-bordered"
          />

          <select
            value={transport}
            onChange={(e) => {
              setTransport(e.target.value);
              setPage(1);
            }}
            className="select select-bordered"
          >
            <option value="">All Transport</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Plane">Plane</option>
            <option value="Launch">Launch</option>
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="select select-bordered"
          >
            <option value="">Sort by Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          <button
            onClick={() => {
              setFrom(fromInput);
              setTo(toInput);
              setPage(1);
            }}
            className="btn btn-secondary"
          >
            Search
          </button>
        </div>
      </motion.div>

      {/* Tickets */}
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, i) => (
            <motion.div
              key={ticket._id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
            >
              <TCard ticket={ticket} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        className="flex justify-center gap-2 mt-10"
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="btn btn-outline"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn ${
              page === i + 1 ? "btn-secondary" : "btn-outline"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="btn btn-outline"
        >
          Next
        </button>
      </motion.div>
    </div>
  );
};

export default AllTickets;
