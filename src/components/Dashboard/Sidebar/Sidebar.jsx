import { use, useState } from "react";
import { Link } from "react-router";
import logo from "../../../assets/images/logo.png";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { AuthContext } from "../../../context/AuthContext";
import UserMenu from "./Menu/UserMenu";
import VendorMenu from "./Menu/VendorMenu";
import AdminMenu from "./Menu/AdminMenu";
import { FaUser } from "react-icons/fa6";
import MenuItem from "./Menu/MenuItem";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../LoadingSpinner";

const Sidebar = () => {
  const { signOutUser } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useRole();

  // Toggle sidebar on mobile
  const handleToggle = () => setIsOpen(!isOpen);

  // Auto close after clicking a menu item (mobile)
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* ---------------- SMALL SCREEN NAV ---------------- */}
      <div className="bg-gray-100 text-gray-800 flex justify-between lg:hidden shadow sticky top-0 z-30">
        <Link to="/" className="block cursor-pointer p-4 font-bold">
          <img src={logo} alt="logo" width="100" height="100" />
        </Link>

        <button
          onClick={handleToggle}
          className="p-4 focus:outline-none hover:bg-gray-200 transition"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* ---------------- OVERLAY FOR MOBILE ---------------- */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 lg:hidden z-20"
        />
      )}

      {/* ---------------- SIDEBAR ---------------- */}
      <div
        className={`
    fixed top-0 left-0 z-50
    flex flex-col justify-between
    bg-base-100 w-64 shadow-lg
    h-screen border-r border-secondary
    transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 
    transition-transform duration-300 ease-in-out
  `}
      >
        <div className="flex flex-col h-full">
          {/* -------- TOP SECTION -------- */}
          <div className="flex items-center justify-between px-4 py-3  shadow rounded-md border-b border-secondary">
            <Link to="/">
              <img src={logo} alt="logo" width="170" height="100" />
            </Link>

            {/* Close button only in mobile */}
            <button
              onClick={handleToggle}
              className="lg:hidden p-1 rounded hover:bg-gray-200"
            >
              <AiOutlineClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* -------- MENU SECTION -------- */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav onClick={closeSidebar}>
              <MenuItem icon={FaUser} label="Profile" address="/dashboard" />
              {role === "user" && <UserMenu />}
              {role === "vendor" && <VendorMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* -------- BOTTOM SECTION -------- */}
          <div className="pb-4">
            <hr className="my-2 text-secondary" />

            <button
              onClick={signOutUser}
              className="flex w-full items-center px-4 py-3 mt-4 text-gray-600 hover:bg-gray-300 transition"
            >
              <GrLogout className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
