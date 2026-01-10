# 🚍 TicketPoint – Online Ticket Booking Platform

## About the Project

TicketPoint is a modern **Online Ticket Booking Platform** built with the **MERN Stack**. It allows users to easily search, book, and pay for travel tickets such as **Bus, Train, Launch, and Plane** from different vendors.

The platform solves the problem of **manual ticket booking and vendor management** by providing:

- A centralized ticket marketplace
- Role-based dashboards for **Users, Vendors, and Admins**
- Secure authentication, booking, and payment system

---

## Live Demo: [https://ticket-point.vercel.app](https://ticket-point.vercel.app)

---

## Key Features

### 🔐 Authentication & Security

- Email/Password authentication
- Google social login
- Password validation
- JWT/Firebase token protected APIs
- Role-based route protection

### 🎫 Ticket Management

- Browse admin-approved tickets
- Search by **From → To**
- Filter by transport type
- Sort by price
- Pagination support

### 🧑 User Features

- Book tickets with quantity validation
- Booking status tracking (Pending / Accepted / Rejected / Paid)
- Stripe payment integration
- Countdown before departure
- Transaction history

### 🏷 Vendor Features

- Add, update, and delete tickets
- View booking requests
- Accept or reject bookings
- Revenue overview with charts

### 🛡 Admin Features

- Approve or reject vendor tickets
- Manage users and roles
- Mark vendors as fraud
- Advertise tickets on homepage (max 6)

### 🌗 UI & UX

- Responsive design (mobile, tablet, desktop)
- Dark / Light mode toggle
- Loading spinners & skeleton loaders
- Interactive charts & animations

---

## Tech Stack

### Frontend

- React 19
- React Router 7
- Tailwind CSS
- TanStack React Query
- Firebase Authentication
- Stripe
- Recharts
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Stripe API

---

## Dependencies

```json
{
  "@stripe/stripe-js": "^8.5.3",
  "@tailwindcss/vite": "^4.1.17",
  "@tanstack/react-query": "^5.90.12",
  "axios": "^1.13.2",
  "firebase": "^12.6.0",
  "framer-motion": "^12.23.25",
  "lucide-react": "^0.556.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.68.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.10.1",
  "react-spinners": "^0.17.0",
  "react-toastify": "^11.0.5",
  "recharts": "^3.5.1",
  "sweetalert2": "^11.26.10",
  "swiper": "^12.0.3"
}
```

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/mdrobiulislam1479/ticket-point-client.git

# Navigate to the project directory
cd ticket-point-client

# Install dependencies
npm install

# Create a .env file and add
VITE_apiKey
VITE_authDomain
VITE_projectId
VITE_storageBucket
VITE_messagingSenderId
VITE_appId
VITE_IMGBB_API_KEY
VITE_API_URL

# Run the development server
npm run dev
```
