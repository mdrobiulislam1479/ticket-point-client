import axios from "axios";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <title>Payment Success</title>
      <div className="bg-primary p-10 rounded-lg shadow-lg text-center">
        <IoBagCheckOutline className="w-16 h-16 text-secondary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-accent mb-2">
          Payment Successful!
        </h1>
        <p className="text-accent/80 mb-6">
          You can view all your bookings in the "My Bookings" section.
        </p>
        <Link
          to="/dashboard/my-bookings"
          className="inline-block bg-secondary text-white font-semibold py-2 px-4 rounded hover:bg-secondary/80 transition duration-300"
        >
          Go to My Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
