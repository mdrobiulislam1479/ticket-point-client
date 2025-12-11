import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Calendar,
  Ticket,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

// Dummy data for illustration
const tickets = [
  {
    id: 1,
    title: "City Express",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    quantity: 2,
    price: 50,
    from: "Dhaka",
    to: "Chittagong",
    departure: "2025-12-15T10:30:00Z",
    status: "pending",
    seatNumbers: "A12, A13",
  },
  {
    id: 2,
    title: "Morning Star",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop",
    quantity: 1,
    price: 80,
    from: "Khulna",
    to: "Barisal",
    departure: "2025-12-12T14:00:00Z",
    status: "paid",
    seatNumbers: "B5",
  },
  {
    id: 3,
    title: "Night Rider",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
    quantity: 3,
    price: 60,
    from: "Sylhet",
    to: "Dhaka",
    departure: "2025-12-20T22:00:00Z",
    status: "accepted",
    seatNumbers: "C1, C2, C3",
  },
];

const TicketCard = ({ ticket }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const departure = new Date(ticket.departure);
      const diff = departure - now;

      if (diff <= 0) {
        setTimeLeft("Departed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket.departure]);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      accepted: "bg-blue-100 text-blue-700 border-blue-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      paid: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 group">
      {/* Image Section with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
              ticket.status
            )}`}
          >
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{ticket.title}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <Ticket size={14} className="mr-1" />
            <span>Seats: {ticket.seatNumbers}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Route Information */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
          <div className="flex-1">
            <p className="text-xs text-slate-500 mb-1">From</p>
            <p className="font-semibold text-slate-800">{ticket.from}</p>
          </div>
          <div className="flex items-center justify-center px-3">
            <ChevronRight className="text-blue-500" size={20} />
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs text-slate-500 mb-1">To</p>
            <p className="font-semibold text-slate-800">{ticket.to}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="text-blue-500 mr-3 flex-shrink-0" size={18} />
            <div>
              <p className="text-slate-600">
                {formatDate(ticket.departure)} at {formatTime(ticket.departure)}
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="text-purple-500 mr-3 flex-shrink-0" size={18} />
            <div>
              <p className="text-slate-600">
                <span className="font-medium text-slate-800">{timeLeft}</span>{" "}
                until departure
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <Ticket className="text-green-500 mr-3 flex-shrink-0" size={18} />
            <div>
              <p className="text-slate-600">
                <span className="font-medium text-slate-800">
                  {ticket.quantity}
                </span>{" "}
                {ticket.quantity > 1 ? "tickets" : "ticket"}
              </p>
            </div>
          </div>
        </div>

        {/* Price and Action */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1">Total Price</p>
            <p className="text-2xl font-bold text-slate-800">
              ${ticket.price * ticket.quantity}
            </p>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const MyBookedTickets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  useEffect(() => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.to.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === filterStatus);
    }

    setFilteredTickets(filtered);
  }, [searchTerm, filterStatus]);

  const totalTickets = tickets.length;
  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.quantity,
    0
  );
  const upcomingTrips = tickets.filter(
    (ticket) => new Date(ticket.departure) > new Date()
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            My Booked Tickets
          </h1>
          <p className="text-slate-600">
            Manage and track all your travel bookings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold">{totalTickets}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Ticket size={28} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Total Spent</p>
                <p className="text-3xl font-bold">${totalAmount}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Calendar size={28} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Upcoming Trips</p>
                <p className="text-3xl font-bold">{upcomingTrips}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <MapPin size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by title, from, or to location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-slate-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 font-medium"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="paid">Paid</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 py-16 text-center">
            <Search className="mx-auto text-slate-300 mb-4" size={64} />
            <p className="text-slate-600 text-lg font-medium">
              No tickets found
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookedTickets;
