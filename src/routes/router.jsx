import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Resister";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
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
      // { path: "all-tickets", element: <AllTickets /> },
      // {
      //   path: "ticket/:id",
      //   element: (
      //     <ProtectedRoute>
      //       <TicketDetails />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },

  // Auth

  // Dashboard
  // {
  //   path: "/dashboard",
  //   element: (
  //     <ProtectedRoute>
  //       <DashboardLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     // User
  //     { path: "profile", element: <UserProfile /> },
  //     { path: "my-bookings", element: <MyBookedTickets /> },
  //     { path: "transactions", element: <TransactionHistory /> },

  //     // Vendor
  //     {
  //       path: "vendor/profile",
  //       element: (
  //         <VendorRoute>
  //           <VendorProfile />
  //         </VendorRoute>
  //       ),
  //     },
  //     {
  //       path: "vendor/add-ticket",
  //       element: (
  //         <VendorRoute>
  //           <AddTicket />
  //         </VendorRoute>
  //       ),
  //     },
  //     {
  //       path: "vendor/my-tickets",
  //       element: (
  //         <VendorRoute>
  //           <MyAddedTickets />
  //         </VendorRoute>
  //       ),
  //     },
  //     {
  //       path: "vendor/requests",
  //       element: (
  //         <VendorRoute>
  //           <RequestedBookings />
  //         </VendorRoute>
  //       ),
  //     },
  //     {
  //       path: "vendor/revenue",
  //       element: (
  //         <VendorRoute>
  //           <RevenueOverview />
  //         </VendorRoute>
  //       ),
  //     },

  //     // Admin
  //     {
  //       path: "admin/profile",
  //       element: (
  //         <AdminRoute>
  //           <AdminProfile />
  //         </AdminRoute>
  //       ),
  //     },
  //     {
  //       path: "admin/manage-tickets",
  //       element: (
  //         <AdminRoute>
  //           <ManageTickets />
  //         </AdminRoute>
  //       ),
  //     },
  //     {
  //       path: "admin/manage-users",
  //       element: (
  //         <AdminRoute>
  //           <ManageUsers />
  //         </AdminRoute>
  //       ),
  //     },
  //     {
  //       path: "admin/advertise",
  //       element: (
  //         <AdminRoute>
  //           <AdvertiseTickets />
  //         </AdminRoute>
  //       ),
  //     },
  //   ],
  // },
]);
