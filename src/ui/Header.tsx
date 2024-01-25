import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaRegUser, FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";

import { useUser } from "../features/authentication/useUser";
import { useDarkLightMode } from "../context/darkModeContext";

const StyledHeader = styled.header`
  padding: 2.4rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  background-color: var(--color-grey-0);
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
`;

const FullName = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 2rem;
`;

const HeaderButton = styled.button`
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  border: none;
  color: var(--color-brand-600);

  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-grey-0);
  }
`;

const Header: React.FC = () => {
  const { user } = useUser();
  const { isDarkMode, switchMode } = useDarkLightMode();
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <User>
        <Avatar src={user?.user_metadata.avatar} />
        <FullName>{user?.user_metadata.fullName}</FullName>
      </User>
      <Buttons>
        <HeaderButton onClick={() => navigate("/account")}>
          <FaRegUser />
        </HeaderButton>
        <HeaderButton onClick={() => switchMode()}>
          {isDarkMode && <FaSun />}
          {!isDarkMode && <FaMoon />}
        </HeaderButton>
        <HeaderButton>
          <FaSignOutAlt />
        </HeaderButton>
      </Buttons>
    </StyledHeader>
  );
};

export default Header;
