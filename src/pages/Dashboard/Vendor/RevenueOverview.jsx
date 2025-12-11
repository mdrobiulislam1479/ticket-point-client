import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Ticket,
  Package,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const dummyData = [
  { date: "2025-12-01", ticketsSold: 10, revenue: 500, ticketsAdded: 12 },
  { date: "2025-12-02", ticketsSold: 15, revenue: 750, ticketsAdded: 8 },
  { date: "2025-12-03", ticketsSold: 8, revenue: 400, ticketsAdded: 10 },
  { date: "2025-12-04", ticketsSold: 20, revenue: 1000, ticketsAdded: 15 },
  { date: "2025-12-05", ticketsSold: 12, revenue: 600, ticketsAdded: 9 },
  { date: "2025-12-06", ticketsSold: 18, revenue: 900, ticketsAdded: 11 },
  { date: "2025-12-07", ticketsSold: 22, revenue: 1100, ticketsAdded: 13 },
];

const transportTypeData = [
  { name: "Bus", value: 45, color: "#3b82f6" },
  { name: "Train", value: 30, color: "#8b5cf6" },
  { name: "Flight", value: 20, color: "#ec4899" },
  { name: "Ferry", value: 5, color: "#10b981" },
];

const RevenueOverview = () => {
  const [timeRange, setTimeRange] = useState("7d");

  const totalRevenue = dummyData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTicketsSold = dummyData.reduce(
    (sum, item) => sum + item.ticketsSold,
    0
  );
  const totalTicketsAdded = dummyData.reduce(
    (sum, item) => sum + item.ticketsAdded,
    0
  );
  const averageRevenue = (totalRevenue / dummyData.length).toFixed(2);

  // Calculate growth percentages (mock data)
  const revenueGrowth = 12.5;
  const ticketsSoldGrowth = 8.3;
  const ticketsAddedGrowth = -3.2;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Revenue Overview
            </h1>
            <p className="text-gray-600">
              Track your business performance and metrics
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="mt-4 md:mt-0 flex gap-2 bg-white rounded-lg shadow-md p-2">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timeRange === range
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {range === "7d" && "7 Days"}
                {range === "30d" && "30 Days"}
                {range === "90d" && "90 Days"}
                {range === "1y" && "1 Year"}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-700" />
              </div>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  revenueGrowth > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {revenueGrowth > 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">
                  {Math.abs(revenueGrowth)}%
                </span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Average: ${averageRevenue}/day
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                <Ticket className="w-8 h-8 text-blue-700" />
              </div>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  ticketsSoldGrowth > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {ticketsSoldGrowth > 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">
                  {Math.abs(ticketsSoldGrowth)}%
                </span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Tickets Sold
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {totalTicketsSold}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Average: {(totalTicketsSold / dummyData.length).toFixed(1)}/day
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl">
                <Package className="w-8 h-8 text-purple-700" />
              </div>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  ticketsAddedGrowth > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {ticketsAddedGrowth > 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">
                  {Math.abs(ticketsAddedGrowth)}%
                </span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Tickets Added
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {totalTicketsAdded}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Average: {(totalTicketsAdded / dummyData.length).toFixed(1)}/day
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-orange-700" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Conversion Rate
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {((totalTicketsSold / totalTicketsAdded) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-2">Sold vs Added</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Revenue Trend</h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-700" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(value) => value.split("-")[2]}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 7 }}
                  fill="url(#revenueGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tickets Sold Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Tickets Sold</h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Ticket className="w-5 h-5 text-blue-700" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dummyData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(value) => value.split("-")[2]}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="ticketsSold"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transport Type Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Sales by Transport Type
              </h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-purple-700" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transportTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {transportTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {transportTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Activity Overview
              </h3>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-700" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(value) => value.split("-")[2]}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ticketsSold"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Sold"
                />
                <Line
                  type="monotone"
                  dataKey="ticketsAdded"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Added"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
