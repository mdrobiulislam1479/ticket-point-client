import { useContext, useState } from "react";
import { FaRegEyeSlash, FaCircleCheck } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import busImg from "../../assets/images/busImg.jpg";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils/image";

export default function Register() {
  const { createUser, signInWithGoogle, setLoading } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const allValid = hasUppercase && hasLowercase && hasMinLength;

  // React Hook Form
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // e.preventDefault();
    setLoading(true);
    const { name, image, email, password } = data;
    const imageFile = image[0];
    const imageURL = await imageUpload(imageFile);

    console.log(imageURL);

    createUser(email, password)
      .then((result) => {
        return updateProfile(result.user, {
          displayName: name,
          photoURL: imageURL || "",
        });
      })
      .then(() => {
        toast.success("Registration successful!");
        // e.target.reset();
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessages = {
          "auth/email-already-in-use": "This email is already registered.",
          "auth/invalid-email": "Invalid email address.",
          "auth/weak-password": "Password is too weak (min 6 characters).",
          "auth/network-request-failed":
            "Network error. Check your connection.",
        };
        toast.error(errorMessages[error.code] || error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google sign in successful!");
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          error.code === "auth/popup-closed-by-user"
            ? "Sign-in popup was closed."
            : error.code === "auth/account-exists-with-different-credential"
            ? "Account already exists with another sign-in method."
            : error.message
        );
      });
  };

  return (
    <div className="flex items-center justify-center pt-5">
      <title>Register | Ticket Point</title>

      <div className="w-full container bg-primary rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative h-full min-h-96">
          <img
            src={busImg}
            alt="Welcome to Ticket Point"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-3">Join Ticket Point</h2>
            <p className="text-lg opacity-90">Start your journey today!</p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="p-8 sm:p-12">
          <div className="max-w-xl mx-auto">
            {/* Logo & Title */}
            <div className="text-center mb-10">
              <img
                src={logo}
                alt="Ticket Point Logo"
                className="h-24 mx-auto"
              />

              <p className="text-accent">Join us and book smarter</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-accent mb-2">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="your name"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                />
              </div>

              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-accent mb-2">
                  Profile Image
                </label>
                <input
                  {...register("image")}
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
      file:mx-2 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-secondary file:text-white
      hover:file:bg-secondary/80
      border border-gray-300 rounded-xl cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary
      py-2"
                />
                <p className="mt-1 text-xs text-gray-400">
                  PNG, JPG or JPEG (max 2MB)
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-accent mb-2">
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-accent mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full px-5 py-4 pr-14 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <IoEyeOutline className="w-6 h-6" />
                    ) : (
                      <FaRegEyeSlash className="w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                <div className="mt-4 space-y-2 text-sm">
                  <p
                    className={`flex items-center gap-2 ${
                      hasUppercase ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {hasUppercase ? <FaCircleCheck /> : <RxCross2 />} At least
                    one uppercase letter
                  </p>
                  <p
                    className={`flex items-center gap-2 ${
                      hasLowercase ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {hasLowercase ? <FaCircleCheck /> : <RxCross2 />} At least
                    one lowercase letter
                  </p>
                  <p
                    className={`flex items-center gap-2 ${
                      hasMinLength ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {hasMinLength ? <FaCircleCheck /> : <RxCross2 />} Minimum 6
                    characters
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!allValid}
                className={`w-full py-4 font-bold rounded-xl shadow-lg transition duration-200 transform  ${
                  allValid
                    ? "bg-secondary hover:bg-secondary/80 text-white hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Create Account
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

            {/* Login Link */}
            <p className="text-center mt-10 text-accent/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-secondary hover:text-secondary/80 hover:underline transition"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
