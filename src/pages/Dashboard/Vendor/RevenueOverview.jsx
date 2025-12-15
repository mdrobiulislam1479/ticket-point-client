import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import StatCard from "./StatCard";

const RevenueOverview = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["revenue-overview", user.email],
    queryFn: async () => {
      const res = await axiosSecure(`/vendor/revenue-overview/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const chartData = [
    {
      name: "Revenue",
      value: data.totalRevenue,
    },
    {
      name: "Tickets Sold",
      value: data.totalTicketsSold,
    },
    {
      name: "Tickets Added",
      value: data.totalTicketsAdded,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Revenue Overview
        </h2>
        <p className="text-gray-600 mt-2">
          Track your earnings, ticket sales, and overall performance in one
          place.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total Revenue" value={`৳ ${data.totalRevenue}`} />
        <StatCard title="Total Tickets Sold" value={data.totalTicketsSold} />
        <StatCard title="Total Tickets Added" value={data.totalTicketsAdded} />
      </div>

      {/* BAR CHART */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-secondary">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Performance Summary
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                fill="#00adb5"
                maxBarSize={100}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
