import { Calendar, ChevronRight, Clock, Ticket } from "lucide-react";
import { useEffect, useState } from "react";

export const TicketCard = ({ ticket }) => {
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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
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

      {/* Content */}
      <div className="p-5 space-y-4">
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

        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="text-blue-500 mr-3 shrink-0" size={18} />
            <p className="text-slate-600">
              {formatDate(ticket.departure)} at {formatTime(ticket.departure)}
            </p>
          </div>

          {ticket.status !== "rejected" && (
            <div className="flex items-center text-sm">
              <Clock className="text-purple-500 mr-3 shrink-0" size={18} />
              <p className="text-slate-600">
                <span className="font-medium text-slate-800">{timeLeft}</span>{" "}
                until departure
              </p>
            </div>
          )}

          <div className="flex items-center text-sm">
            <Ticket className="text-green-500 mr-3 shrink-0" size={18} />
            <p className="text-slate-600">
              <span className="font-medium text-slate-800">
                {ticket.quantity}
              </span>{" "}
              {ticket.quantity > 1 ? "tickets" : "ticket"}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 mb-1">Total Price</p>
            <p className="text-2xl font-bold text-slate-800">
              ${ticket.price * ticket.quantity}
            </p>
          </div>

          {ticket.status === "pending" && (
            <button
              disabled
              className="px-5 py-2.5 rounded-lg text-white font-medium text-sm bg-gray-400 cursor-not-allowed"
            >
              Pending Approval
            </button>
          )}

          {ticket.status === "accepted" && (
            <button
              disabled={new Date(ticket.departure) < new Date()}
              className={`px-5 py-2.5 rounded-lg text-white font-medium text-sm transition-colors ${
                new Date(ticket.departure) < new Date()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
