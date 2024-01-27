import { FaMoon, FaSun } from "react-icons/fa";

import { useDarkLightMode } from "../context/darkModeContext";
import IconButton from "./IconButton";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, switchMode } = useDarkLightMode();
  return (
    <IconButton onClick={() => switchMode()}>
      {isDarkMode && <FaSun />}
      {!isDarkMode && <FaMoon />}
    </IconButton>
  );
};

export default DarkModeToggle;
