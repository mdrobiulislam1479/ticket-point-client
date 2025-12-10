import { BsBookmarkCheckFill } from "react-icons/bs";
import MenuItem from "./MenuItem";

import { GrTransaction } from "react-icons/gr";

const UserMenu = () => {
  return (
    <div>
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
