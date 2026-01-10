import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { use } from "react";
import { toast } from "react-toastify";
import busImg from "../../assets/images/busImg.jpg";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext";

const ForgotPass = () => {
  const { forgotPassword, setLoading } = use(AuthContext);
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleReset = (e) => {
    e.preventDefault();
    setLoading(true);

    forgotPassword(email)
      .then(() => {
        toast.success("Check your email! Password reset link sent.");
        window.open("https://mail.google.com", "_blank");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorMessages = {
          "auth/invalid-email": "Please enter a valid email address.",
          "auth/user-not-found": "No account found with this email.",
          "auth/too-many-requests":
            "Too many attempts. Please try again later.",
          "auth/network-request-failed":
            "Network error. Check your connection.",
        };
        toast.error(
          errorMessages[error.code] || "Something went wrong. Try again."
        );
      });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <title>Forgot Password | Ticket Point</title>

      <div className="w-full max-w-5xl bg-primary rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative h-full min-h-96">
          <img
            src={busImg}
            alt="Reset Password"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-3">No Worries!</h2>
            <p className="text-lg opacity-90">
              We'll help you get back on track
            </p>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="p-8 sm:p-12 lg:p-16">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center lg:text-left mb-10">
              <Link to={"/"}>
                <img
                  src={logo}
                  alt="Logo"
                  className="h-16 mb-8 mx-auto lg:mx-0 object-contain hidden lg:block"
                />
              </Link>

              <h3 className="text-3xl font-bold text-base-content">
                Reset Password
              </h3>
              <p className="text-base-content/60 mt-2">
                Enter the email associated with your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleReset} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-accent mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-secondary hover:bg-secondary/80 text-white font-bold rounded-xl shadow-lg transform  transition duration-200 cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-10 text-center">
              <Link
                to="/login"
                className="text-accent/80 hover:text-accent font-medium hover:underline transition flex items-center justify-center gap-2"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
