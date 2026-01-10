import { use, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import busImg from "../../assets/images/busImg.jpg";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils/user";
import { ShieldUser, Store, UserRound } from "lucide-react";

const Login = () => {
  const { signInUser, signInWithGoogle, setLoading } = use(AuthContext);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // React Hook Form
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { email, password } = data;
      await signInUser(email, password);
      toast.success("Log In successful!");
      navigate(location.state || "/");
    } catch (error) {
      if (!error?.code) {
        toast.error("An unknown error occurred.");
      } else {
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
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const { user } = await signInWithGoogle();
      toast.success("Google sign in successful!");

      // Save user to database
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate("/");
    } catch (error) {
      toast.error(
        error.code === "auth/popup-closed-by-user"
          ? "Sign-in popup was closed."
          : error.code === "auth/account-exists-with-different-credential"
          ? "Account already exists with another sign-in method."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Quick Access Login Users
  const quickUsers = {
    user: {
      email: import.meta.env.VITE_User_Email,
      password: import.meta.env.VITE_User_Password,
    },
    vendor: {
      email: import.meta.env.VITE_Vendor_Email,
      password: import.meta.env.VITE_Vendor_Password,
    },
    admin: {
      email: import.meta.env.VITE_Admin_Email,
      password: import.meta.env.VITE_Admin_Password,
    },
  };

  const handleQuickLogin = async (role) => {
    setLoading(true);
    try {
      await signInUser(quickUsers[role].email, quickUsers[role].password);
      toast.success(`${role} Log In successful!`);
      navigate(location.state || "/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center pt-5">
      <title>Log In | Ticket Point</title>

      <div className="w-full container bg-primary rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative">
          <img
            src={busImg}
            alt="Welcome to Ticket Point"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
            <p className="text-lg opacity-90">
              Book your next journey with ease
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 sm:p-12">
          <div>
            <div className="max-w-md mx-auto">
              {/* Logo and Title */}
              <div className="text-center lg:text-left mb-6">
                <Link to={"/"}>
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-16 mb-6 mx-auto lg:mx-0 object-contain hidden lg:block"
                  />
                </Link>

                <h3 className="text-3xl font-bold text-base-content">
                  Welcome Back
                </h3>
                <p className="text-base-content/60 mt-2">
                  Enter your credentials to access your tickets.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-accent mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
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
                      {...register("password", { required: true })}
                      type={showPassword ? "text" : "password"}
                      className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-secondary transition"
                    >
                      {showPassword ? (
                        <IoEyeOutline className="w-6 h-6" />
                      ) : (
                        <FaRegEyeSlash className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  <div className="mt-1 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/forgot-pass", { state: { email } })
                      }
                      className="text-sm font-medium text-secondary hover:text-secondary/80 hover:underline transition cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-secondary hover:bg-secondary/80 text-white font-bold rounded-xl shadow-lg transform  transition duration-200 cursor-pointer"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="my-4 divider text-sm">OR</div>
              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 hover:border-secondary rounded-xl font-medium text-accent hover:bg-secondary/5 transition cursor-pointer"
              >
                <FcGoogle className="w-6 h-6" />
                Continue with Google
              </button>

              {/* Divider */}
              <div className="my-4 divider text-sm">Quick Access</div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleQuickLogin("user")}
                  className="py-3 border rounded-xl flex items-center gap-2 justify-center hover:border-secondary cursor-pointer"
                >
                  <UserRound size={20} /> User
                </button>

                <button
                  onClick={() => handleQuickLogin("vendor")}
                  className="py-3 border rounded-xl flex items-center gap-2 justify-center hover:border-secondary cursor-pointer"
                >
                  <Store size={20} /> Vendor
                </button>

                <button
                  onClick={() => handleQuickLogin("admin")}
                  className="py-3 border rounded-xl flex items-center gap-2 justify-center hover:border-secondary cursor-pointer"
                >
                  <ShieldUser size={20} /> Admin
                </button>
              </div>

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
