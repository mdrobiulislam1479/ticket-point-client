import { BsBookmarkCheckFill } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { FaUser } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";

const UserMenu = () => {
  return (
    <div>
      <MenuItem icon={FaUser} label="User Profile" address="profile" />
      <MenuItem
        icon={BsBookmarkCheckFill}
        label="My Booked Tickets"
        address="my-bookings"
      />
      <MenuItem
        icon={GrTransaction}
        label="Transaction History"
        address="transactions"
      />
    </div>
  );
};

export default UserMenu;
