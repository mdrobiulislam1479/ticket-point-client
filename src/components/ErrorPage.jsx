import React from "react";
import { ArrowLeft, Home, RefreshCw, Mail } from "lucide-react";

export default function ErrorPage() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center">
          {/* Main 404 Text */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-slate-800 tracking-tighter">
              4<span className="text-secondary">0</span>4
            </h1>
            <div className="w-48 h-1 bg-secondary mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Message */}
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-700 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            The page you're looking for doesn't exist or has been moved. Don't
            worry, let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-medium rounded-xl hover:bg-secondary/80 transition-all transform hover:scale-105 shadow-lg"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>

            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-700 font-medium rounded-xl border-2 border-slate-300 hover:border-secondary hover:bg-slate-50 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Page
            </button>
          </div>

          {/* Additional Help */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Need Help?
            </h3>
            <p className="text-slate-600 mb-6">
              If you believe this is an error, please contact our support team.
            </p>
            <a
              href="mailto:support@yourcompany.com"
              className="inline-flex items-center gap-3 text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@ticketpoint.com
            </a>
          </div>

          {/* Footer */}
          <div className="mt-16 text-slate-500 text-sm">
            <p>© 2025 Ticket Point. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}
