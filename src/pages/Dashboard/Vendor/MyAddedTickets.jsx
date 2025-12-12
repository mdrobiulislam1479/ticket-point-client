import { use, useState } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Package,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner";
import EditTicketModal from "./EditTicketModal";

const MyAddedTickets = () => {
  const [editingTicket, setEditingTicket] = useState(null);

  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["tickets", user.email],
    queryFn: async () => {
      const result = await axiosSecure(`/tickets/vendor/${user?.email}`);
      return result.data;
    },
  });
  console.log(data);

  if (isLoading) return <LoadingSpinner />;

  const handleDelete = async (ticketId) => {
    try {
      const response = await axiosSecure.delete(`/tickets/${ticketId}`);
      if (response.data.deletedCount > 0) {
        toast.success("Ticket deleted successfully!");
        queryClient.invalidateQueries(["tickets", user.email]);
      } else {
        toast.error("Ticket not found!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ticket");
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "accepted":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          label: "Accepted",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Rejected",
        };
      case "pending":
      default:
        return {
          icon: AlertCircle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          label: "Pending",
        };
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Added Tickets
          </h1>
          <p className="text-gray-600">Manage and track your ticket listings</p>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((ticket) => {
            const statusConfig = getStatusConfig(ticket.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={ticket._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* Image with Status Badge */}
                <div className="relative">
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="w-full h-48 object-cover"
                  />
                  <div
                    className={`absolute top-4 right-4 ${statusConfig.bgColor} ${statusConfig.borderColor} border-2 px-3 py-1.5 rounded-full flex items-center gap-2`}
                  >
                    <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                    <span
                      className={`text-sm font-semibold ${statusConfig.color}`}
                    >
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-sm font-bold text-gray-900">
                      {ticket.transportType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {ticket.title}
                  </h3>

                  {/* Route */}
                  <div className="flex items-center gap-3 mb-4 text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="font-medium">{ticket.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium">{ticket.to}</span>
                  </div>

                  {/* Price and Quantity */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-blue-700 mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs font-medium">Price</span>
                      </div>
                      <p className="text-lg font-bold text-blue-900">
                        ${ticket.price}
                      </p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-indigo-700 mb-1">
                        <Package className="w-4 h-4" />
                        <span className="text-xs font-medium">Available</span>
                      </div>
                      <p className="text-lg font-bold text-indigo-900">
                        {ticket.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Departure */}
                  <div className="flex items-center gap-2 text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Departure
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(ticket.departure).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(ticket.departure).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Perks */}
                  {ticket.perks?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        AMENITIES
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ticket.perks.map((perk, idx) => (
                          <span
                            key={idx}
                            className="bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                          >
                            {perk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setEditingTicket(ticket)}
                      className="flex-1 bg-secondary text-white py-2.5 rounded-lg hover:bg-secondary/80 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-lg hover:bg-red-100 transition font-medium flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          closeModal={() => setEditingTicket(null)}
          refetch={() => queryClient.invalidateQueries(["tickets", user.email])}
        />
      )}
    </div>
  );
};

export default MyAddedTickets;
