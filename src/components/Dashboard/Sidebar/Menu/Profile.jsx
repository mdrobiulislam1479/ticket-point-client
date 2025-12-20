import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Mail, MapPin, Phone, Calendar, Edit2, Camera } from "lucide-react";
import LoadingSpinner from "../../../LoadingSpinner";

const Profile = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/${user?.email}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen p-4 sm:p-6 flex items-center justify-center">
      <title>Ticket Point | Profile</title>
      <div className="w-full max-w-4xl bg-primary  rounded-2xl shadow-2xl overflow-hidden border border-secondary/10 transition-all">
        {/* Header Banner */}
        <div className="h-40 sm:h-48 bg-secondary relative">
          <button className="absolute top-4 right-4 bg-green-400 backdrop-blur-lg text-white px-4 py-2 rounded-lg  transition flex items-center gap-2 text-sm font-medium">
            {data?.role}
          </button>

          {/* Avatar */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <img
              src={data?.image}
              alt={user?.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl object-cover transition-all group-hover:scale-105 bg-primary"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20 px-4 sm:px-8 pb-8">
          {/* Name*/}
          <div className="mb-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-accent ">
              {data?.name}
            </h1>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {/* Card Item */}
            <ProfileCard
              icon={<Mail />}
              title="Email"
              value={user.email}
              color="blue"
            />
            <ProfileCard
              icon={<Phone />}
              title="Phone"
              value={"N/A"}
              color="purple"
            />
            <ProfileCard
              icon={<MapPin />}
              title="Location"
              value={"N/A"}
              color="green"
            />
            <ProfileCard
              icon={<Calendar />}
              title="Joined"
              value={data?.created_at?.slice(0, 10) || ""}
              color="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function ProfileCard({ icon, title, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-base-100 rounded-xl shadow-sm hover:shadow-md transition">
      <div className={`${colorMap[color]} p-2 rounded-lg`}>
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <div>
        <p className="text-xs text-gray-500 ">{title}</p>
        <p className="text-accent  font-medium break-all">{value}</p>
      </div>
    </div>
  );
}

export default Profile;
