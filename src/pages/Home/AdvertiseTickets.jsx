import { TCard } from "../../components/TCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";

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

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      {tickets?.length === 0 ? (
        ""
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 mt-20">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-accent">
                Advertised{" "}
                <span className="bg-linear-to-r from-[#00adb5] to-[#364153] bg-clip-text text-transparent">
                  Tickets
                </span>
              </h2>
              <p className="text-accent text-lg max-w-2xl mx-auto">
                Explore popular tickets chosen specially for you.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets?.map((ticket) => (
              <TCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertiseTickets;
