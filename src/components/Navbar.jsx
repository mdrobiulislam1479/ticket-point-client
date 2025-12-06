import { Link, NavLink } from "react-router";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import ThemeToggle from "./ThemeToggle";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);

  const navClass = (isActive) =>
    `px-3 py-2 rounded ${
      isActive
        ? "text-secondary font-semibold"
        : "text-accent hover:text-secondary transition-colors duration-300"
    }`;

  return (
    <header className="bg-primary sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* mobile toggles */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer p-2 hover:bg-secondary/40 rounded-full text-accent"
          >
            {open ? <RxCross2 size={24} /> : <FaBarsStaggered size={24} />}
          </button>
        </div>

        {/* logo */}

        <div className="w-44">
          <Link to="/" className="flex items-center gap-2 text-white font-bold">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => navClass(isActive)}>
            Home
          </NavLink>
          <NavLink
            to="/all-tickets"
            className={({ isActive }) => navClass(isActive)}
          >
            All Tickets
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => navClass(isActive)}
          >
            Dashboard
          </NavLink>
        </nav>

        {/* right */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn bg-transparent hover:bg-secondary/30 border-secondary"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn bg-secondary hover:bg-secondary/90 text-white border-secondary"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar">
                <div className="w-12 rounded-full cursor-pointer">
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${
                        user.displayName || user.email
                      }`
                    }
                    alt="user"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <span className="font-medium">
                    {user.displayName || user.email}
                  </span>
                </li>
                <li>
                  <Link to="/dashboard/profile">My Profile</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("access-token");
                      window.location = "/";
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-blend-saturation border-y border-y-secondary text-center">
          <div className="flex flex-col gap-6 py-6">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              Home
            </NavLink>
            <NavLink
              to="/all-tickets"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              All Tickets
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setOpen(false)}
              className={({ isActive }) => navClass(isActive)}
            >
              Dashboard
            </NavLink>
            {!user ? (
              <div className="flex flex-col gap-6 w-40 mx-auto">
                <Link
                  to="/login"
                  className="btn bg-transparent hover:bg-secondary/30 border-secondary"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn bg-secondary hover:bg-secondary/90 text-white border-secondary"
                  onClick={() => setOpen(false)}
                >
                  Register
                </Link>
              </div>
            ) : (
              <NavLink
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className={({ isActive }) => navClass(isActive)}
              >
                My Profile
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
