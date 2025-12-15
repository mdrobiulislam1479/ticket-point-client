import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { TicketCard } from "./TicketCard";

const MyBookedTickets = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["booked-tickets"],
    queryFn: async () => {
      const res = await axiosSecure(`/booked-tickets/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">
            My Booked Tickets
          </h1>
          <p className="text-accent/80">
            Manage and track all your travel bookings
          </p>
        </div>

        {/* Tickets Grid */}
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets?.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="bg-primary rounded-2xl shadow-sm border border-slate-200 py-16 text-center">
            <Search className="mx-auto text-accent/80 mb-4" size={64} />
            <p className="text-accent/80 text-lg font-medium">
              No tickets found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookedTickets;
