import { FaSignOutAlt } from "react-icons/fa";
import IconButton from "../../ui/IconButton";
import { useLogout } from "./useLogout";

const Logout: React.FC = () => {
  const { logout, isLoggingout } = useLogout();

  return (
    <IconButton disabled={isLoggingout} onClick={() => logout()}>
      <FaSignOutAlt />
    </IconButton>
  );
};

export default Logout;
