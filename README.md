src/
│
├── assets/
│ ├── logo.png
│ ├── banner/
│ ├── icons/
│ └── ...images
│
├── components/ # Reusable UI components (global)
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── LoadingSpinner.jsx
│ ├── Countdown.jsx
│ ├── TicketCard.jsx
│ ├── ProtectedRoute.jsx
│ ├── AdminRoute.jsx
│ ├── VendorRoute.jsx
│ ├── Container.jsx
│ └── ErrorPage.jsx
│
├── layouts/
│ ├── MainLayout.jsx # Navbar + Outlet + Footer
│ ├── DashboardLayout.jsx # Sidebar + Outlet (User, Vendor, Admin)
│ └── AuthLayout.jsx # Centered login/register layout
│
├── pages/
│ ├── Home/
│ │ ├── Home.jsx
│ │ ├── Hero.jsx
│ │ ├── Advertisement.jsx
│ │ ├── LatestTickets.jsx
│ │ └── ExtraSectionOne.jsx
│ │ └── ExtraSectionTwo.jsx
│ │
│ ├── Tickets/
│ │ ├── AllTickets.jsx
│ │ ├── TicketDetails.jsx
│ │ └── BookNowModal.jsx
│ │
│ ├── Auth/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── SocialLogin.jsx
│ │
│ ├── Dashboard/
│ │ ├── User/
│ │ │ ├── UserProfile.jsx
│ │ │ ├── MyBookedTickets.jsx
│ │ │ └── TransactionHistory.jsx
│ │ │
│ │ ├── Vendor/
│ │ │ ├── VendorProfile.jsx
│ │ │ ├── AddTicket.jsx
│ │ │ ├── MyAddedTickets.jsx
│ │ │ └── RequestedBookings.jsx
│ │ │ └── RevenueOverview.jsx
│ │ │
│ │ └── Admin/
│ │ ├── AdminProfile.jsx
│ │ ├── ManageTickets.jsx
│ │ ├── ManageUsers.jsx
│ │ └── AdvertiseTickets.jsx
│
│
├── hooks/
│ ├── useAuth.js
│ ├── useAxiosPublic.js
│ ├── useAxiosSecure.js
│ ├── useRole.js # admin/vendor/user
│ └── useCountdown.js
│
├── routes/
│ └── router.jsx
│
├── context/
│ └── AuthProvider.jsx
│
├── api/ # Axios + TanStack Query API files
│ ├── axiosPublic.js
│ ├── axiosSecure.js
│ ├── authApi.js
│ ├── ticketApi.js
│ ├── bookingApi.js
│ ├── userApi.js
│ ├── adminApi.js
│ └── vendorApi.js
│
├── utils/
│ ├── formatDate.js
│ ├── roleCheck.js
│ ├── stripePayment.js
│ └── passwordValidation.js
│
├── styles/
│ ├── index.css
│ └── tailwind.css
│
├── main.jsx
└── App.jsx
