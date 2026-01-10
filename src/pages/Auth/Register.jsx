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
import { saveOrUpdateUser } from "../../utils/user";

export default function Register() {
  const { createUser, signInWithGoogle, setLoading } = useContext(AuthContext);
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // React Hook Form
  const { register, handleSubmit, watch } = useForm();

  // Watch password for real-time validation
  const password = watch("password", "");
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const allValid = hasUppercase && hasLowercase && hasMinLength;

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const { name, image, email, password } = data;

      // 1. Upload image
      const imageFile = image[0];
      const imageURL = await imageUpload(imageFile);

      // 2. Create user
      const result = await createUser(email, password);

      // 3. Update profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageURL || "",
      });

      // 4. Save user to DB
      await saveOrUpdateUser({
        name,
        email,
        image: imageURL,
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password is too weak (min 6 characters).",
        "auth/network-request-failed": "Network error. Check your connection.",
      };

      toast.error(errorMessages[error.code] || error.message);
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
          <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-3">Join Ticket Point</h2>
            <p className="text-lg opacity-90">Start your journey today!</p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="p-8 sm:p-12">
          <div className="max-w-xl mx-auto">
            {/* Logo & Title */}
            <div className="text-center lg:text-left mb-6">
              <Link to={"/"}>
                <img
                  src={logo}
                  alt="Logo"
                  className="h-14 mb-4 mx-auto lg:mx-0 object-contain hidden lg:block"
                />
              </Link>

              <h3 className="text-3xl font-extrabold text-base-content tracking-tight">
                Create Account
              </h3>
              <p className="text-base-content/60 mt-1">
                Start your journey with us today.
              </p>
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
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
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
      file:rounded-md file:border-2 file:border-accent/50
      file:text-sm file:font-semibold
      file:text-accent/50
      file:cursor-pointer
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
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="block text-sm font-semibold text-accent mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", { required: true })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-secondary/30 focus:border-secondary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-base-content/40 hover:text-secondary transition"
                  >
                    {showPassword ? (
                      <IoEyeOutline size={20} />
                    ) : (
                      <FaRegEyeSlash size={20} />
                    )}
                  </button>
                </div>

                {/* Password Strength Visualizer */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      hasMinLength ? "bg-secondary" : "bg-base-300"
                    }`}
                  ></div>
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      hasUppercase ? "bg-secondary" : "bg-base-300"
                    }`}
                  ></div>
                  <div
                    className={`h-1.5 rounded-full transition-colors ${
                      hasLowercase ? "bg-secondary" : "bg-base-300"
                    }`}
                  ></div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  <span
                    className={`text-[11px] flex items-center gap-1 font-medium ${
                      hasMinLength ? "text-secondary" : "text-base-content/40"
                    }`}
                  >
                    {hasMinLength ? <FaCircleCheck /> : <RxCross2 />} 6+
                    Characters
                  </span>
                  <span
                    className={`text-[11px] flex items-center gap-1 font-medium ${
                      hasUppercase ? "text-secondary" : "text-base-content/40"
                    }`}
                  >
                    {hasUppercase ? <FaCircleCheck /> : <RxCross2 />} Uppercase
                  </span>
                  <span
                    className={`text-[11px] flex items-center gap-1 font-medium ${
                      hasLowercase ? "text-secondary" : "text-base-content/40"
                    }`}
                  >
                    {hasLowercase ? <FaCircleCheck /> : <RxCross2 />} Lowercase
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!allValid}
                className={`w-full py-3 font-bold rounded-xl shadow-lg transition duration-200 transform  ${
                  allValid
                    ? "bg-secondary hover:bg-secondary/80 text-white  cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Create Account
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
