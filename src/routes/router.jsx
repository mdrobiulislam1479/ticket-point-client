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
import MyBookedTickets from "../pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";
import Profile from "../components/Dashboard/Sidebar/Menu/Profile";
import PaymentSuccess from "../pages/PaymentSuccess";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

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
      { path: "/all-tickets", element: <AllTickets /> },
      {
        path: "/ticket/:id",
        element: <TicketsDetails />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
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
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedRoute>
            <MyBookedTickets />
          </ProtectedRoute>
        ),
      },
      {
        path: "transactions",
        element: (
          <ProtectedRoute>
            <TransactionHistory />
          </ProtectedRoute>
        ),
      },

      {
        path: "vendor/add-ticket",
        element: (
          <ProtectedRoute>
            <VendorRoute>
              <AddTicket />
            </VendorRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "vendor/my-tickets",
        element: (
          <ProtectedRoute>
            <VendorRoute>
              <MyAddedTickets />
            </VendorRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "vendor/requests",
        element: (
          <ProtectedRoute>
            <VendorRoute>
              <RequestedBookings />
            </VendorRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "vendor/revenue",
        element: (
          <ProtectedRoute>
            <VendorRoute>
              <RevenueOverview />
            </VendorRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "admin/manage-tickets",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <ManageTickets />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/advertise",
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <AdvertiseTickets />
            </AdminRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
