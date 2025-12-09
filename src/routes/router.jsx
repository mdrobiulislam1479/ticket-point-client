import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home/Home";
import ForgotPass from "../pages/Auth/ForgotPass";
import ErrorPage from "../components/ErrorPage";
import AllTickets from "../pages/Tickets/AllTickets";
import ProtectedRoute from "./ProtectedRoute";
import TicketsDetails from "../pages/Tickets/TicketsDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import MyBookedTickets from "../pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import VendorProfile from "../pages/Dashboard/Vendor/VendorProfile";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-pass",
        element: <ForgotPass />,
      },
      { path: "all-tickets", element: <AllTickets /> },
      {
        path: "ticket/:id",
        element: (
          <ProtectedRoute>
            <TicketsDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Dashboard
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // User
      { path: "profile", element: <UserProfile /> },
      { path: "my-bookings", element: <MyBookedTickets /> },
      { path: "transactions", element: <TransactionHistory /> },

      // Vendor
      {
        path: "vendor/profile",
        element: (
          <VendorRoute>
            <VendorProfile />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/add-ticket",
        element: (
          <VendorRoute>
            <AddTicket />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/my-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/requests",
        element: (
          <VendorRoute>
            <RequestedBookings />
          </VendorRoute>
        ),
      },
      {
        path: "vendor/revenue",
        element: (
          <VendorRoute>
            <RevenueOverview />
          </VendorRoute>
        ),
      },

      // Admin
      {
        path: "admin/profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/advertise",
        element: (
          <AdminRoute>
            <AdvertiseTickets />
          </AdminRoute>
        ),
      },
    ],
  },
]);
