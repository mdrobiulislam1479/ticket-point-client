import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
} from "lucide-react";

const MyAddedTickets = () => {
  const [tickets, setTickets] = useState([
    {
      _id: "1",
      title: "Express Bus to Dhaka",
      from: "Chittagong",
      to: "Dhaka",
      transportType: "Bus",
      price: 25,
      quantity: 50,
      departure: "2025-12-15T09:00:00Z",
      perks: ["AC", "WiFi"],
      image: "https://via.placeholder.com/400x300",
      status: "pending",
    },
    {
      _id: "2",
      title: "Flight to Sylhet",
      from: "Dhaka",
      to: "Sylhet",
      transportType: "Flight",
      price: 120,
      quantity: 30,
      departure: "2025-12-18T14:30:00Z",
      perks: ["Meal", "Extra Baggage"],
      image: "https://via.placeholder.com/400x300",
      status: "accepted",
    },
    {
      _id: "3",
      title: "Train to Rajshahi",
      from: "Dhaka",
      to: "Rajshahi",
      transportType: "Train",
      price: 15,
      quantity: 100,
      departure: "2025-12-20T07:45:00Z",
      perks: [],
      image: "https://via.placeholder.com/400x300",
      status: "rejected",
    },
  ]);

  const [filter, setFilter] = useState("all");

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

  const filteredTickets =
    filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

  const handleDelete = (id) => {
    setTickets(tickets.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Added Tickets
          </h1>
          <p className="text-gray-600">Manage and track your ticket listings</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-8 inline-flex gap-2">
          {["all", "pending", "accepted", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium transition capitalize ${
                filter === status
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status}
              {status === "all" && ` (${tickets.length})`}
              {status !== "all" &&
                ` (${tickets.filter((t) => t.status === status).length})`}
            </button>
          ))}
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tickets found
            </h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "You haven't added any tickets yet."
                : `No ${filter} tickets at the moment.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => {
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
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
                              className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200"
                            >
                              {perk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2">
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
        )}
      </div>
    </div>
  );
};

export default MyAddedTickets;
