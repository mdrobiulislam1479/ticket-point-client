import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  Shield,
  UserCheck,
  AlertTriangle,
  Mail,
  User,
  Users,
} from "lucide-react";
import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user, loading } = use(AuthContext);

  const { data: users = [], isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure("/admin/users");
      return res.data;
    },
  });

  const makeAdmin = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/users/make-admin/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
      Swal.fire("Success!", "User is now an Admin.", "success");
    },
  });

  const makeVendor = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/users/make-vendor/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
      Swal.fire("Success!", "User is now a Vendor.", "success");
    },
  });

  const markFraud = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/users/mark-fraud/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-users"]);
      Swal.fire(
        "Fraud Marked!",
        "Vendor has been blocked and tickets hidden.",
        "error"
      );
    },
  });

  // Confirmation handlers
  const confirmMakeAdmin = (user) => {
    Swal.fire({
      title: "Make Admin?",
      text: `${user.name} will have full admin access.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin.mutate(user._id);
      }
    });
  };

  const confirmMakeVendor = (user) => {
    Swal.fire({
      title: "Make Vendor?",
      text: `${user.name} will be able to add tickets.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      confirmButtonText: "Yes, Make Vendor",
    }).then((result) => {
      if (result.isConfirmed) {
        makeVendor.mutate(user._id);
      }
    });
  };

  const confirmFraud = (user) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: "This action will permanently block the vendor and hide all of their tickets.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Mark Fraud",
    }).then((result) => {
      if (result.isConfirmed) {
        markFraud.mutate(user._id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-green-100 text-green-800 border border-green-200";
      case "vendor":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "user":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Manage Users</h1>
          <p className="text-accent/80 mb-4">
            Control user roles and permissions across the platform
          </p>
          <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full shadow-sm border border-secondary/10">
            <span className="text-2xl font-bold text-secondary">
              {users.length}
            </span>
            <span className="text-accent/80">Total Users</span>
          </div>
        </div>

        {/* Table */}
        {users.length === 0 ? (
          <div className="bg-primary rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-500">
              There are no users to manage at the moment.
            </p>
          </div>
        ) : (
          <div className="bg-primary rounded-2xl shadow-xl overflow-hidden border border-secondary/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Role
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/10">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className={`hover:bg-base-100 transition-colors ${
                        user.isFraud ? "bg-red-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-accent/80">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-accent/70">
                          <Mail className="w-4 h-4 text-accent/70" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                          {user.isFraud && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                              <AlertTriangle className="w-3 h-3" />
                              FRAUD
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            disabled={user.role === "admin"}
                            onClick={() => confirmMakeAdmin(user)}
                            className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            title="Make Admin"
                          >
                            <Shield className="w-4 h-4" />
                            Admin
                          </button>

                          <button
                            disabled={user.role === "vendor"}
                            onClick={() => confirmMakeVendor(user)}
                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            title="Make Vendor"
                          >
                            <UserCheck className="w-4 h-4" />
                            Vendor
                          </button>

                          {user.role === "vendor" && !user.isFraud && (
                            <button
                              onClick={() => confirmFraud(user)}
                              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm cursor-pointer"
                              title="Mark as Fraud"
                            >
                              <AlertTriangle className="w-4 h-4" />
                              Fraud
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
