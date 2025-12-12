import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

export const BookingModal = ({ ticket, onClose, user }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { quantity: 1 },
  });

  const createBooking = useMutation({
    mutationFn: (bookingData) =>
      axiosSecure.post("/booked-tickets", bookingData),
    onSuccess: () => {
      toast.success("Booking submitted!");
      onClose();
    },
  });

  const onSubmit = async (data) => {
    const bookingQty = parseInt(data.quantity);

    if (bookingQty > ticket.quantity) {
      return setError("quantity", {
        type: "manual",
        message: "Booking quantity can't exceed available tickets",
      });
    }

    const bookingData = {
      ticketId: ticket._id,
      quantity: bookingQty,
      status: "pending",
      user_email: user.email,
      user_name: user.displayName,
      created_At: new Date(),
    };

    createBooking.mutate(bookingData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-96 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Book Ticket</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="text-sm text-gray-700">Quantity</label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity required",
              min: { value: 1, message: "Minimum 1 ticket required" },
            })}
            min={1}
            max={ticket.quantity}
            className="w-full border p-2 rounded-md mt-1"
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
          )}

          <div className="flex justify-end mt-5 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
              disabled={createBooking.isPending}
            >
              {createBooking.isPending ? "Booking..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
