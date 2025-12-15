import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  User,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, use } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import { BookingModal } from "./BookingModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TicketDetails = () => {
  const { id } = useParams();
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);

  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  // Fetch ticket by ID
  const { data: ticket = {}, isLoading } = useQuery({
    enabled: !!id && !loading && !!user?.email,
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosSecure(`/tickets/${id}`);
      return res.data;
    },
  });

  // Countdown Timer
  useEffect(() => {
    if (!ticket?.departure) return;

    const interval = setInterval(() => {
      const now = new Date();
      const departure = new Date(ticket.departure);
      const diff = departure - now;

      if (diff <= 0) {
        setTimeLeft("Departed");
        setIsExpired(true);
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
  }, [ticket]);

  if (isLoading) return <LoadingSpinner />;

  const isBookDisabled = isExpired || ticket.quantity === 0;

  return (
    <div className="py-8 px-4">
      <div className="container">
        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
          <img
            src={ticket.image}
            alt={ticket.title}
            className="w-full h-80 md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {ticket.title}
            </h1>
            <div className="flex items-center gap-3 text-white text-lg">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{ticket.from}</span>
              <span className="text-2xl">→</span>
              <span className="font-medium">{ticket.to}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Journey Details */}
            <div className="bg-primary rounded-xl shadow-lg p-6 border border-base-100">
              <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Journey Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-base-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-accent font-medium mb-1">
                      Departure Time
                    </p>
                    <p className="text-accent font-semibold">
                      {new Date(ticket.departure).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-base-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-accent font-medium mb-1">
                      Time Until Departure
                    </p>
                    <p
                      className={`font-bold text-lg ${
                        isExpired ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {timeLeft}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks */}
            {ticket.perks?.length > 0 && (
              <div className="bg-primary rounded-xl shadow-lg p-6 border border-base-100">
                <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Included Amenities
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ticket.perks.map((perk, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-base-100 rounded-lg border border-secondary/10"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-accent font-medium">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vendor Info */}
            <div className="bg-primary rounded-xl shadow-lg p-6 border border-base-100">
              <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Operator Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                  <User className="w-5 h-5 text-accent/70" />
                  <div>
                    <p className="text-xs text-accent/70 uppercase tracking-wide">
                      Company
                    </p>
                    <p className="text-accent font-semibold">
                      {ticket.vendor_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                  <Tag className="w-5 h-5 text-accent/70" />
                  <div>
                    <p className="text-xs text-accent/70 uppercase tracking-wide">
                      Contact
                    </p>
                    <p className="text-accent font-semibold">
                      {ticket.vendor_email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-primary rounded-xl shadow-xl p-6 border border-base-100 sticky top-4">
              <div className="mb-6">
                <p className="text-sm text-accent/70 uppercase tracking-wide mb-2">
                  Price per Seat
                </p>
                <p className="text-4xl font-bold text-accent">
                  ৳{ticket.price.toLocaleString()}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                  <span className="text-accent font-medium">
                    Available Seats
                  </span>
                  <span
                    className={`font-bold text-lg ${
                      ticket.quantity < 5 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {ticket.quantity}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                  <span className="text-accent font-medium">
                    Transport Type
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold  bg-green-100 text-green-700
                    "
                  >
                    {ticket.transportType}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                  <span className="text-accent font-medium">Featured</span>
                  <span className="flex items-center gap-1">
                    {ticket.advertised ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-400" />
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                  <span className="text-accent font-medium">Visibility</span>
                  <span className="text-sm font-semibold text-accent/80">
                    {ticket.hidden ? "Hidden" : "Public"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setOpenModal(true)}
                disabled={isBookDisabled}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-200 ${
                  isBookDisabled
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-secondary hover:from-secondary/80 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {isExpired
                  ? "Departed"
                  : ticket.quantity === 0
                  ? "Sold Out"
                  : "Book Now"}
              </button>

              {isBookDisabled && (
                <p className="text-sm text-slate-500 text-center mt-3">
                  {isExpired
                    ? "This journey has already departed"
                    : "No seats available"}
                </p>
              )}
              {openModal && (
                <BookingModal
                  ticket={ticket}
                  onClose={() => setOpenModal(false)}
                  user={user}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
