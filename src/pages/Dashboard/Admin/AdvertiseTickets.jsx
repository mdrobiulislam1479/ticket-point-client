import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  ArrowRight,
  DollarSign,
  Megaphone,
  Eye,
  EyeOff,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch approved tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axiosSecure("/admin/advertise-tickets");
      return res.data;
    },
  });

  // Toggle advertise
  const toggleAdvertise = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/tickets/advertise/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["advertise-tickets"]);
      Swal.fire("Updated!", "Advertisement status updated", "success");
    },
    onError: (err) => {
      Swal.fire(
        "Limit Reached",
        err?.response?.data?.message || "Cannot advertise more tickets",
        "error"
      );
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const advertisedCount = tickets.filter((t) => t.advertised).length;

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-accent">
              Advertise Tickets
            </h1>
          </div>
          <p className="text-accent/80 mb-4">
            Promote tickets to increase visibility and boost sales
          </p>
          <div className="flex gap-3">
            <div className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-2xl font-bold">{advertisedCount}</span>
              <span>Currently Advertised</span>
            </div>
          </div>
        </div>

        {/* Table */}
        {tickets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Approved Tickets
            </h3>
            <p className="text-gray-500">
              There are no approved tickets available for advertising.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-base-300">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Advertise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="bg-primary hover:bg-primary/95 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-accent">
                            {ticket.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-accent">
                          <span className="font-medium">{ticket.from}</span>
                          <ArrowRight className="w-4 h-4 text-accent/80" />
                          <span className="font-medium">{ticket.to}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                          <DollarSign className="w-5 h-5" />
                          {ticket.price}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold border border-green-200">
                          <CheckCircle className="w-3 h-3" />
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => toggleAdvertise.mutate(ticket._id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105 shadow-md cursor-pointer ${
                              ticket.advertised
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                          >
                            {ticket.advertised ? (
                              <>
                                <EyeOff className="w-4 h-4" />
                                Unadvertise
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4" />
                                Advertise
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseTickets;
