import React, { useState } from "react";
import { Search, Download, Filter, Calendar } from "lucide-react";

// Dummy transactions data
const transactions = [
  {
    id: "txn_1ABC23",
    amount: 100,
    ticketTitle: "City Express",
    paymentDate: "2025-12-10T14:30:00Z",
    status: "completed",
  },
  {
    id: "txn_2XYZ45",
    amount: 80,
    ticketTitle: "Morning Star",
    paymentDate: "2025-12-09T10:15:00Z",
    status: "completed",
  },
  {
    id: "txn_3DEF67",
    amount: 150,
    ticketTitle: "Night Rider",
    paymentDate: "2025-12-08T18:00:00Z",
    status: "completed",
  },
  {
    id: "txn_4GHI89",
    amount: 120,
    ticketTitle: "Sunset Express",
    paymentDate: "2025-12-07T16:45:00Z",
    status: "completed",
  },
  {
    id: "txn_5JKL01",
    amount: 95,
    ticketTitle: "Coastal Journey",
    paymentDate: "2025-12-06T09:20:00Z",
    status: "completed",
  },
];

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = transactions.filter(
      (txn) =>
        txn.id.toLowerCase().includes(term) ||
        txn.ticketTitle.toLowerCase().includes(term)
    );
    setFilteredTransactions(filtered);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Transaction History
          </h1>
          <p className="text-slate-600">
            View and manage all your transactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {transactions.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(
                    transactions.reduce((sum, txn) => sum + txn.amount, 0)
                  )}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Download className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">
                  Average Transaction
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(
                    transactions.reduce((sum, txn) => sum + txn.amount, 0) /
                      transactions.length
                  )}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Filter className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Search and Filter Bar */}
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by transaction ID or ticket title..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Transaction ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Ticket
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Date & Time
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-slate-700 font-medium">
                        {txn.id}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-800 font-medium">
                        {txn.ticketTitle}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-800 font-semibold">
                        {formatCurrency(txn.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-slate-800 text-sm">
                          {formatDate(txn.paymentDate)}
                        </span>
                        <span className="text-slate-500 text-xs">
                          {formatTime(txn.paymentDate)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <div className="py-16 text-center">
              <Search className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-600 text-lg font-medium">
                No transactions found
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Try adjusting your search criteria
              </p>
            </div>
          )}

          {/* Pagination Footer */}
          {filteredTransactions.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing {filteredTransactions.length} of {transactions.length}{" "}
                  transactions
                </p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
