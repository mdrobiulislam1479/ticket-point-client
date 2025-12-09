import { Ticket } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 animate-ping opacity-20">
          <div className="w-32 h-32 rounded-full bg-secondary/80"></div>
        </div>

        {/* Rotating ring */}
        <div className="relative w-32 h-32 animate-spin">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary border-r-secondary"></div>
        </div>

        {/* Ticket icon - counter-rotating for smooth effect */}
        <div
          className="absolute inset-0 flex items-center justify-center animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "2s" }}
        >
          <Ticket className="w-12 h-12 text-secondary" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
