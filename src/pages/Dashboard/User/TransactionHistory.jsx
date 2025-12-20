import { useQuery } from "@tanstack/react-query";
import { Search, Download, Filter, Calendar } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TransactionHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = use(AuthContext);

  const { data: transactions = [], isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/transactions/${user.email}`);
      return res.data;
    },
  });
  console.log(transactions);

  if (isLoading) return <LoadingSpinner />;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const totalAmount = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const avgAmount =
    transactions.length > 0 ? totalAmount / transactions.length : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <title>Transaction History</title>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-accent mb-2">
            Transaction History
          </h1>
          <p className="text-accent/80">
            View and manage all your transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary rounded-xl shadow-sm p-6 border border-secondary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent/80 mb-1">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-accent">
                  {transactions.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-xl shadow-sm p-6 border border-secondary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent/80 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-accent">{totalAmount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Download className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-xl shadow-sm p-6 border border-secondary/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-accent/80 mb-1">
                  Average Transaction
                </p>
                <p className="text-2xl font-bold text-accent">
                  {Math.round(avgAmount)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Filter className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-primary rounded-xl shadow-sm border border-secondary/10 overflow-hidden">
          {transactions.length === 0 ? (
            <div className="py-16 text-center">
              <Search className="mx-auto text-accent/60 mb-4" size={48} />
              <p className="text-accent/80 text-lg font-medium">
                No transactions found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary border-b border-secondary/10">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Transaction ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Ticket
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Date & Time
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr
                      key={txn._id}
                      className="border-b border-secondary/10 hover:bg-base-100 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono text-sm text-accent/80 font-medium">
                        {txn.transactionId}
                      </td>
                      <td className="py-4 px-6 text-accent/80 font-medium">
                        {txn.ticketTitle}
                      </td>
                      <td className="py-4 px-6 text-accent/80 font-semibold">
                        {txn.amount}
                      </td>
                      <td className="py-4 px-6 flex flex-col">
                        <span className="text-accent text-sm">
                          {formatDate(txn.paidAt)}
                        </span>
                        <span className="text-accent/70 text-xs">
                          {formatTime(txn.paidAt)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            txn.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {txn.status === "paid" ? "Completed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
