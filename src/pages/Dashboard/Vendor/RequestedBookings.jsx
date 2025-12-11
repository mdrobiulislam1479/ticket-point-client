import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Ticket,
  Package,
  DollarSign,
  Search,
  Filter,
} from "lucide-react";

const dummyBookings = [
  {
    _id: "1",
    userName: "John Doe",
    userEmail: "john@example.com",
    ticketTitle: "Dhaka to Chittagong",
    quantity: 2,
    price: 50,
    status: "pending",
    date: "2025-12-12T10:30:00Z",
  },
  {
    _id: "2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    ticketTitle: "Sylhet to Dhaka",
    quantity: 1,
    price: 40,
    status: "pending",
    date: "2025-12-11T14:20:00Z",
  },
  {
    _id: "3",
    userName: "Ali Khan",
    userEmail: "ali@example.com",
    ticketTitle: "Khulna to Dhaka",
    quantity: 3,
    price: 60,
    status: "pending",
    date: "2025-12-11T09:15:00Z",
  },
  {
    _id: "4",
    userName: "Sara Ahmed",
    userEmail: "sara@example.com",
    ticketTitle: "Dhaka to Sylhet",
    quantity: 2,
    price: 45,
    status: "accepted",
    date: "2025-12-10T16:45:00Z",
  },
  {
    _id: "5",
    userName: "Mike Wilson",
    userEmail: "mike@example.com",
    ticketTitle: "Chittagong to Dhaka",
    quantity: 1,
    price: 55,
    status: "rejected",
    date: "2025-12-10T11:30:00Z",
  },
];

const RequestedBookings = () => {
  const [bookings, setBookings] = useState(dummyBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAccept = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "accepted" } : b))
    );
  };

  const handleReject = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "rejected" } : b))
    );
  };

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
      case "pending":
      default:
        return {
          icon: Clock,
          color: "text-yellow-700",
          bgColor: "bg-yellow-100",
          label: "Pending",
        };
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ticketTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Requested Bookings
          </h1>
          <p className="text-gray-600">
            Manage and respond to customer booking requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.total}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Ticket className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.pending}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.accepted}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.rejected}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or ticket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {["all", "pending", "accepted", "rejected"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-6 py-3 rounded-lg font-medium transition capitalize ${
                    filterStatus === status
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Ticket Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">
                        No bookings found
                      </p>
                      <p className="text-gray-400 text-sm">
                        Try adjusting your search or filters
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => {
                    const statusConfig = getStatusConfig(booking.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <tr
                        key={booking._id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-2">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {booking.userName}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {booking.userEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">
                              {booking.ticketTitle}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-900">
                              {booking.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-bold text-green-700">
                              {booking.price * booking.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.color}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAccept(booking._id)}
                              disabled={booking.status !== "pending"}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                                booking.status === "pending"
                                  ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              <CheckCircle className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(booking._id)}
                              disabled={booking.status !== "pending"}
                              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                                booking.status === "pending"
                                  ? "bg-red-600 text-white hover:bg-red-700 shadow-md"
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

        {/* Results Summary */}
        {filteredBookings.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredBookings.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {bookings.length}
            </span>{" "}
            bookings
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedBookings;
