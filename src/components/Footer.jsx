import { Link } from "react-router";
import logo from "../assets/images/logo.png";
import stripe from "../assets/images/stripe.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-accent mt-8">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        <div className="w-44 mb-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-bold h-16"
          >
            <img src={logo} alt="Logo" />
          </Link>
          <div className="text-sm">
            Book bus, train, launch & flight tickets easily
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-tickets">All Tickets</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact Info</h4>
          <p className="text-sm">email: support@ticketpoint.com</p>
          <p className="text-sm">phone: +8801XXXXXXXXX</p>
          <p className="text-sm">facebook: /ticketpoint</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Payment Methods</h4>

          <div className="rounded-xl border border-blue-400 w-26">
            <img src={stripe} alt="stripe" className="rounded-xl h-16" />
          </div>
        </div>
      </div>

      <div className="py-3">
        <div className="container mx-auto px-6 text-sm text-center text-gray-400 border-t border-t-secondary/30 pt-4">
          © 2025 TicketPoint. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
