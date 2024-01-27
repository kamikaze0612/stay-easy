import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import styled from "styled-components";

import IconButton from "./IconButton";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 2rem;
`;

const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <IconButton onClick={() => navigate("/account")}>
        <FaRegUser />
      </IconButton>

      <DarkModeToggle />

      <Logout />
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
