import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center pl-4 py-3 my-2 mx-2 rounded-sm  transition-colors duration-300 transform  hover:bg-base-200    ${
          isActive
            ? "bg-secondary hover:bg-secondary text-white"
            : "text-accent"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
