import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoFilterOutline } from "react-icons/io5";
import { TCard } from "../../components/TCard";
import { SidebarContent } from "../../components/shared/SidebarContent";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import { useSearchParams } from "react-router";

const AllTickets = () => {
  const [searchParams] = useSearchParams();

  const [fromInput, setFromInput] = useState(searchParams.get("from") || "");
  const [toInput, setToInput] = useState(searchParams.get("to") || "");
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [transport, setTransport] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const limit = 6;

  //update states if the URL changes while the user is on this page
  useEffect(() => {
    const urlFrom = searchParams.get("from");
    const urlTo = searchParams.get("to");

    if (urlFrom) {
      setFromInput(urlFrom);
      setFrom(urlFrom);
    }
    if (urlTo) {
      setToInput(urlTo);
      setTo(urlTo);
    }
  }, [searchParams]);

  // Data Fetching
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

  const handleReset = () => {
    setFromInput("");
    setToInput("");
    setFrom("");
    setTo("");
    setTransport("");
    setSort("");
    setPage(1);
  };

  const handleSearch = () => {
    setFrom(fromInput);
    setTo(toInput);
    setPage(1);
    setIsDrawerOpen(false);
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <title>All Tickets | Ticket Point</title>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-base-content tracking-tight">
              Browse <span className="text-secondary">Tickets</span>
            </h2>
            <p className="text-base-content/50 font-medium">
              Find and book your next journey instantly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* --- DESKTOP SIDEBAR --- */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-base-100 border border-base-300 rounded-[2.5rem] p-8">
              <SidebarContent
                handleReset={handleReset}
                fromInput={fromInput}
                setFromInput={setFromInput}
                toInput={toInput}
                setToInput={setToInput}
                transport={transport}
                setTransport={setTransport}
                sort={sort}
                setSort={setSort}
                setPage={setPage}
                handleSearch={handleSearch}
              />
            </div>
          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <main className="lg:col-span-9">
            {isLoading ? (
              /* --- CARD SECTION --- */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(limit)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : tickets.length === 0 ? (
              <div className="h-[400px] flex flex-col items-center justify-center bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
                <p className="text-xl font-bold opacity-30">
                  No tickets found.
                </p>
                <button
                  onClick={handleReset}
                  className="btn btn-link text-secondary lowercase"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tickets.map((ticket, i) => (
                  <motion.div
                    key={ticket._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <TCard ticket={ticket} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="btn btn-circle btn-ghost"
                >
                  ❮
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-black transition-all ${
                      page === i + 1
                        ? "bg-secondary text-white shadow-lg"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="btn btn-circle btn-ghost"
                >
                  ❯
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="btn btn-secondary btn-circle w-16 h-16 shadow-2xl"
        >
          <IoFilterOutline size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 bg-base-100 rounded-t-[3rem] z-70 p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-base-300 rounded-full mx-auto mb-8" />
              <SidebarContent
                handleReset={handleReset}
                fromInput={fromInput}
                setFromInput={setFromInput}
                toInput={toInput}
                setToInput={setToInput}
                transport={transport}
                setTransport={setTransport}
                sort={sort}
                setSort={setSort}
                setPage={setPage}
                handleSearch={handleSearch}
              />
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-ghost w-full mt-4"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllTickets;
