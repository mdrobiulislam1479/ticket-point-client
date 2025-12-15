import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  Mail,
  DollarSign,
  Hash,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user, loading } = use(AuthContext);

  // Fetch all tickets
  const { data: tickets = [], isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const res = await axiosSecure("/admin/tickets");
      return res.data;
    },
  });

  // Approve ticket
  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/tickets/approve/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-tickets"]);
    },
  });

  // Reject ticket
  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/tickets/reject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-tickets"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // SweetAlert handlers
  const handleApprove = (ticket) => {
    Swal.fire({
      title: "Approve Ticket?",
      text: "This ticket will be visible in All Tickets page.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(ticket._id);
        Swal.fire("Approved!", "The ticket has been approved.", "success");
      }
    });
  };

  const handleReject = (ticket) => {
    Swal.fire({
      title: "Reject Ticket?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(ticket._id);
        Swal.fire("Rejected!", "The ticket has been rejected.", "error");
      }
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">
            Manage Tickets
          </h1>
          <p className="text-accent/80 mb-4">
            Review and manage all ticket submissions
          </p>
          <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full shadow-sm border border-secondary/10">
            <span className="text-2xl font-bold text-secondary">
              {tickets.length}
            </span>
            <span className="text-accent/80">Total Tickets</span>
          </div>
        </div>

        {/* Table */}
        {tickets.length === 0 ? (
          <div className="bg-primary rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Tickets Found
            </h3>
            <p className="text-gray-500">
              There are no tickets to manage at the moment.
            </p>
          </div>
        ) : (
          <div className="bg-primary rounded-2xl shadow-xl overflow-hidden border border-secondary/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Ticket
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Vendor
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-secondary/10">
                  {tickets.map((ticket, index) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-base-100 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-accent/80 font-semibold">
                          <Hash className="w-4 h-4" />
                          {index + 1}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold text-accent/80">
                        {ticket.title}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-accent/90">
                          <span>{ticket.from}</span>
                          <ArrowRight className="w-4 h-4 text-accent/70" />
                          <span>{ticket.to}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                          <DollarSign className="w-5 h-5" />
                          {ticket.price}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-accent/70 text-sm">
                          <Mail className="w-4 h-4 text-accent/70" />
                          {ticket.vendor_email}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleApprove(ticket)}
                            disabled={
                              approveMutation.isPending ||
                              ticket.status !== "pending"
                            }
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg disabled:opacity-50 cursor-pointer  disabled:cursor-not-allowed text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(ticket)}
                            disabled={
                              rejectMutation.isPending ||
                              ticket.status !== "pending"
                            }
                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg disabled:opacity-50 cursor-pointer  disabled:cursor-not-allowed text-sm"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
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

export default ManageTickets;
