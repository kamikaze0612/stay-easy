/* eslint-disable react-refresh/only-export-components */
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  const switchMode = () => setIsDarkMode((cur) => !cur);

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
