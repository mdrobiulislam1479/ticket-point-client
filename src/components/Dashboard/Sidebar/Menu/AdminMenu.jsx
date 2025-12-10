import { FaUser } from "react-icons/fa6";
import MenuItem from "./MenuItem";
import { MdManageAccounts, MdOutlineManageHistory } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";

const AdminMenu = () => {
  return (
    <div>
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Tickets"
        address="admin/manage-tickets"
      />
      <MenuItem
        icon={MdManageAccounts}
        label="Manage Users"
        address="admin/manage-users"
      />
      <MenuItem
        icon={RiAdvertisementFill}
        label="Advertise Tickets"
        address="admin/advertise"
      />
    </div>
  );
};

export default AdminMenu;
