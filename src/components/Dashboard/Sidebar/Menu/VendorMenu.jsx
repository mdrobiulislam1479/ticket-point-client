import { FaRegChartBar, FaUser } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import { MdAddHome, MdAssignmentAdd } from "react-icons/md";
import { BsBookmarkCheckFill } from "react-icons/bs";

const VendorMenu = () => {
  return (
    <div>
      <MenuItem icon={FaUser} label="Vendor Profile" address="vendor/profile" />
      <MenuItem
        icon={MdAssignmentAdd}
        label="Add Ticket"
        address="vendor/add-ticket"
      />
      <MenuItem
        icon={MdAddHome}
        label="My Added Tickets"
        address="vendor/my-tickets"
      />
      <MenuItem
        icon={BsBookmarkCheckFill}
        label="Requested Bookings"
        address="vendor/requests"
      />
      <MenuItem
        icon={FaRegChartBar}
        label="Revenue Overview"
        address="vendor/revenue"
      />
    </div>
  );
};

export default VendorMenu;
