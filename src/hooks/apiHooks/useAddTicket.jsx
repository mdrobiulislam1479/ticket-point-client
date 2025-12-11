import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useAddTicket = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationFn: async (ticketData) => {
      const res = await axiosSecure.post("/tickets", ticketData);
      return res.data;
    },
  });
};

export default useAddTicket;
