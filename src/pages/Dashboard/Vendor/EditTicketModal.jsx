import {
  Upload,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  CheckCircle2,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { imageUpload } from "../../../utils/image";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const perksOptions = ["AC", "Breakfast", "Wi-Fi", "Snacks"];

const EditTicketModal = ({ ticket, closeModal, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: ticket.title,
      from: ticket.from,
      to: ticket.to,
      transportType: ticket.transportType,
      price: ticket.price,
      quantity: ticket.quantity,
      departure: ticket.departure?.slice(0, 16),
      perks: ticket.perks || [],
      image: ticket.image,
    },
  });

  const selectedPerks = watch("perks", []);
  const image = watch("image");

  // Perks toggle
  const togglePerk = (perk) => {
    const updated = selectedPerks.includes(perk)
      ? selectedPerks.filter((p) => p !== perk)
      : [...selectedPerks, perk];

    setValue("perks", updated);
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await imageUpload(file);
      setValue("image", imageUrl);
    } catch {
      toast.error("Image upload failed!");
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/tickets/${ticket._id}`, data);
      refetch();
      closeModal();
      toast.success("Ticket updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update ticket");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-primary rounded-2xl w-full max-w-3xl shadow-xl max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">Edit Ticket</h2>
          <button onClick={closeModal}>
            <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold">Ticket Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-3 border rounded-lg mt-2"
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
                {...register("from", { required: "Departure is required" })}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> To
              </label>
              <input
                {...register("to", { required: "Destination is required" })}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Transport Type */}
          <div>
            <label className="text-sm font-semibold">Transport Type</label>
            <select
              {...register("transportType", {
                required: "Transport type is required",
              })}
              className="w-full px-4 py-3 border rounded-lg mt-2"
            >
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Plane">Plane</option>
              <option value="Launch">Launch</option>
            </select>
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
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Package className="w-4 h-4" /> Quantity
              </label>
              <input
                type="number"
                {...register("quantity", { required: "Quantity is required" })}
                className="w-full px-4 py-3 border rounded-lg"
              />
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
          </div>

          {/* Perks */}
          <div>
            <label className="text-sm font-semibold">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
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
            <label className="text-sm font-semibold">Ticket Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-3">
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

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/80 text-white py-4 rounded-lg font-semibold cursor-pointer"
            >
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicketModal;
