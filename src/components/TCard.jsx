import { Calendar, ChevronRight, Clock, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const TCard = ({ ticket }) => {
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
    <div className="bg-primary rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-secondary/50 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-green-100 text-green-700 border-green-200">
            {ticket.transportType}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{ticket.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between bg-base-100 rounded-xl p-4">
          <div className="flex-1">
            <p className="text-xs text-accent/80 mb-1">From</p>
            <p className="font-semibold text-accent">{ticket.from}</p>
          </div>
          <div className="flex items-center justify-center px-3">
            <ChevronRight className="text-blue-500" size={20} />
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs text-accent/80 mb-1">To</p>
            <p className="font-semibold text-accent">{ticket.to}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="text-blue-500 mr-3 shrink-0" size={18} />
            <p className="text-accent">
              {formatDate(ticket.departure)} at {formatTime(ticket.departure)}
            </p>
          </div>

          {ticket.status !== "rejected" && (
            <div className="flex items-center text-sm">
              <Clock className="text-purple-500 mr-3 shrink-0" size={18} />
              <p className="text-accent/80">
                <span className="font-medium text-accent">{timeLeft}</span>{" "}
                until departure
              </p>
            </div>
          )}

          <div className="flex items-center text-sm">
            <Ticket className="text-green-500 mr-3 shrink-0" size={18} />
            <p className="text-accent/80">
              <span className="font-medium text-accent">{ticket.quantity}</span>{" "}
              {ticket.quantity > 1 ? "tickets" : "ticket"}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-secondary/50 flex items-center justify-between">
          <div>
            <p className="text-xs text-accent/70 mb-1">Total Price</p>
            <p className="text-2xl font-bold text-accent">${ticket.price}</p>
          </div>

          <Link
            to={`ticket/${ticket._id}`}
            className="px-5 py-2.5 rounded-lg text-white font-medium text-sm bg-secondary"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};
