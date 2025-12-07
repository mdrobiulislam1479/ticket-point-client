import { use, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import busImg from "../../assets/images/busImg.jpg";
import logo from "../../assets/images/logo.png";

const Login = () => {
  const { signInUser, signInWithGoogle, setLoading } = use(AuthContext);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Log In successful!");
        e.target.reset();
        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (!error?.code) {
          toast.error("An unknown error occurred.");
          return;
        }

        const errorMessages = {
          "auth/invalid-email": "Invalid email address.",
          "auth/user-disabled": "This user account has been disabled.",
          "auth/user-not-found": "No account found with this email.",
          "auth/wrong-password": "Incorrect password. Please try again.",
          "auth/network-request-failed":
            "Network error. Check your internet connection.",
          "auth/invalid-credential": "The login credential is invalid.",
        };

        toast.error(errorMessages[error.code] || error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google sign in successful!");
        navigate(location?.state || "/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const msg =
          error.code === "auth/popup-closed-by-user"
            ? "Sign-in popup was closed."
            : error.code === "auth/account-exists-with-different-credential"
            ? "Account exists with different sign-in method."
            : error.message;
        toast.error(msg);
      });
  };

  return (
    <div className="flex items-center justify-center ">
      <title>Log In | Ticket Point</title>

      <div className="w-full container bg-primary rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative">
          <img
            src={busImg}
            alt="Welcome to Ticket Point"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
            <p className="text-lg opacity-90">
              Book your next journey with ease
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-10 lg:p-16 xl:p-20">
          <div>
            <div className="max-w-md mx-auto">
              {/* Logo or Title */}
              <div className="text-center mb-10">
                <img
                  src={logo}
                  alt="Ticket Point Logo"
                  className="h-24 mx-auto"
                />
                <p className=" text-accent">Sign in to continue your journey</p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogIn} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-accent mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-accent mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 transition"
                    >
                      {showPassword ? (
                        <IoEyeOutline className="w-6 h-6" />
                      ) : (
                        <FaRegEyeSlash className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/forgot-password", { state: { email } })
                      }
                      className="text-sm font-medium text-secondary hover:text-secondary/80 hover:underline transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-secondary hover:bg-secondary/80 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition duration-200"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-accent bg-primary">
                  or continue with
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-300 hover:border-secondary rounded-xl font-medium text-accent hover:bg-secondary/5 transition"
              >
                <FcGoogle className="w-6 h-6" />
                Continue with Google
              </button>

              {/* Register Link */}
              <p className="text-center mt-10 text-accent/70">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-secondary hover:text-secondary/80 hover:underline transition"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
