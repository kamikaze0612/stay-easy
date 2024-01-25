import styled from "styled-components";
import { useDarkLightMode } from "../context/darkModeContext";

const StyledLogo = styled.img.attrs({
  alt: "Stay easy logo",
})`
  width: 16rem;
  align-self: center;
`;

const Logo: React.FC = () => {
  const { isDarkMode } = useDarkLightMode();

  return <StyledLogo src={`/img/logo-${isDarkMode ? "dark" : "light"}.png`} />;
};

export default Logo;
