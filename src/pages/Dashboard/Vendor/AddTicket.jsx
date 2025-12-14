import { useContext } from "react";
import {
  Upload,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  CheckCircle2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import useAddTicket from "../../../hooks/apiHooks/useAddTicket";
import { imageUpload } from "../../../utils/image";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const perksOptions = ["AC", "Breakfast", "Wi-Fi", "Snacks"];

const AddTicket = () => {
  const { user, loading } = useContext(AuthContext);
  const { mutateAsync, isPending } = useAddTicket();

  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/${user?.email}`);
      return result.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const selectedPerks = watch("perks", []);
  const image = watch("image");

  // Fraud vendor check
  if (data?.isFraud) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold text-center">
          You have been marked as a fraud vendor. You cannot add new tickets.
        </p>
      </div>
    );
  }

  // Perks toggle
  const togglePerk = (perk) => {
    const updated = selectedPerks.includes(perk)
      ? selectedPerks.filter((p) => p !== perk)
      : [...selectedPerks, perk];

    setValue("perks", updated);
  };

  //handle upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await imageUpload(file);
      setValue("image", imageUrl);
    } catch (err) {
      console.log(err);
      toast.error("Image upload failed!");
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    const ticketData = {
      ...data,
      vendor_name: user.displayName,
      vendor_email: user.email,
    };

    try {
      await mutateAsync(ticketData);
      toast.success("Ticket added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add ticket");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Add New Ticket
        </h1>
        <p className="text-gray-600 mb-8">
          Fill in the details to create a new ticket listing
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 space-y-8">
            {/* Title */}
            <div>
              <label className="text-sm font-semibold mb-2">Ticket Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="e.g., Dhaka to Cox's Bazar Express"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* From & To */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> From
                </label>
                <input
                  {...register("from", {
                    required: "Departure location is required",
                  })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Departure city"
                />
                {errors.from && (
                  <p className="text-red-500 text-sm">{errors.from.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> To
                </label>
                <input
                  {...register("to", { required: "Destination is required" })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Destination city"
                />
                {errors.to && (
                  <p className="text-red-500 text-sm">{errors.to.message}</p>
                )}
              </div>
            </div>

            {/* Transport Type */}
            <div>
              <label className="text-sm font-semibold mb-2">
                Transport Type
              </label>
              <select
                {...register("transportType", {
                  required: "Transport type is required",
                })}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Select transport type</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Ferry">Ferry</option>
              </select>
              {errors.transportType && (
                <p className="text-red-500 text-sm">
                  {errors.transportType.message}
                </p>
              )}
            </div>

            {/* Price & Quantity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Price
                </label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4" /> Quantity
                </label>
                <input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="0"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Departure */}
            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Departure
              </label>
              <input
                type="datetime-local"
                {...register("departure", {
                  required: "Departure time is required",
                })}
                className="w-full px-4 py-3 border rounded-lg"
              />
              {errors.departure && (
                <p className="text-red-500 text-sm">
                  {errors.departure.message}
                </p>
              )}
            </div>

            {/* Perks */}
            <div>
              <label className="text-sm font-semibold mb-3">Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {perksOptions.map((perk) => (
                  <button
                    key={perk}
                    type="button"
                    onClick={() => togglePerk(perk)}
                    className={`px-4 py-3 rounded-lg border-2 flex items-center justify-center gap-2 ${
                      selectedPerks.includes(perk)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200"
                    }`}
                  >
                    {selectedPerks.includes(perk) && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    {perk}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-semibold mb-3">Ticket Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        Click to change image
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-gray-700 font-medium mt-3">
                        Click to upload
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Vendor Info */}
          <div className="p-6 px-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Vendor Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Vendor Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Vendor Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="px-8 py-6">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-secondary text-white py-4 rounded-lg font-semibold shadow-lg disabled:opacity-50"
            >
              {isPending ? "Adding Ticket..." : "Add Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;
