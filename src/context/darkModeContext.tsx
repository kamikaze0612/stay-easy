/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type DarkModeContextType = {
  isDarkMode: boolean;
  switchMode: () => void;
};

type DarkModeContextProviderProps = {
  children: ReactNode;
};

const DarkLightModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  switchMode: () => {},
});

const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({
  children,
}) => {
  const { setValue, getValue } = useLocalStorage();

  const [isDarkMode, setIsDarkMode] = useState(getValue("theme") === "dark");

  const switchMode = () => {
    setIsDarkMode((cur) => !cur);
    const theme = isDarkMode ? "light" : "dark";
    setValue("theme", theme);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkLightModeContext.Provider value={{ isDarkMode, switchMode }}>
      {children}
    </DarkLightModeContext.Provider>
  );
};

export function useDarkLightMode() {
  const { isDarkMode, switchMode } = useContext(DarkLightModeContext);

  return { isDarkMode, switchMode };
}

export default DarkModeContextProvider;
