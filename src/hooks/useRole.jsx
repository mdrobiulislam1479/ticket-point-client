import { use } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

const useRole = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/role`);
      return result.data.role;
    },
  });

  return { role, isRoleLoading };
};

export default useRole;
