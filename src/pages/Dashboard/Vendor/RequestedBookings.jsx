import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Ticket,
  Package,
  DollarSign,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";

const RequestedBookings = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch Bookings
  const { data: bookings = [], isLoading } = useQuery({
    enabled: !!user?.email,
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure(`/vendor/bookings/${user.email}`);
      return res.data;
    },
  });

  console.log(bookings);

  // Accept booking
  const acceptMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/bookings/accept/${id}`, { status: "accepted" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  // Reject booking
  const rejectMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/bookings/reject/${id}`, { status: "rejected" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
    },
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case "accepted":
        return {
          icon: CheckCircle,
          color: "text-green-700",
          bgColor: "bg-green-100",
          label: "Accepted",
        };
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-700",
          bgColor: "bg-red-100",
          label: "Rejected",
        };
      default:
        return {
          icon: Clock,
          color: "text-yellow-700",
          bgColor: "bg-yellow-100",
          label: "Pending",
        };
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Requested Bookings
        </h1>
        <p className="text-gray-600 mb-8">
          Manage and respond to customer booking requests
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Bookings",
              value: stats.total,
              color: "blue",
              icon: Ticket,
            },
            {
              label: "Pending",
              value: stats.pending,
              color: "yellow",
              icon: Clock,
            },
            {
              label: "Accepted",
              value: stats.accepted,
              color: "green",
              icon: CheckCircle,
            },
            {
              label: "Rejected",
              value: stats.rejected,
              color: "red",
              icon: XCircle,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${item.color}-500`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {item.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {item.value}
                  </p>
                </div>
                <div className={`bg-${item.color}-100 p-3 rounded-lg`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">
                    Ticket Title
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">
                    Total Quantity
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-white uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No bookings found
                      </p>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => {
                    const statusConfig = getStatusConfig(booking.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 rounded-full p-2">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {booking.user_name}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {booking.user_email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">{booking.title}</td>

                        <td className="px-6 py-4 text-center">
                          {booking.bookedQuantity}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            {booking.price * booking.bookedQuantity}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.color}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig.label}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => acceptMutation.mutate(booking._id)}
                              disabled={booking.status !== "pending"}
                              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                booking.status === "pending"
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Accept
                            </button>

                            <button
                              onClick={() => rejectMutation.mutate(booking._id)}
                              disabled={booking.status !== "pending"}
                              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                                booking.status === "pending"
                                  ? "bg-red-600 text-white hover:bg-red-700"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedBookings;
