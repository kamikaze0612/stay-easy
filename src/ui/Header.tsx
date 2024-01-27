import styled from "styled-components";

import User from "./User";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.header`
  padding: 2.4rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  background-color: var(--color-grey-0);
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <User />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
