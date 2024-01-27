import styled from "styled-components";

import Footer from "./Footer";
import Logo from "./Logo";
import NavList from "./NavList";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  padding: 4.8rem 1.6rem;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  padding: 3.2rem 1.6rem;
`;

const End = styled.div`
  margin-top: auto;
  margin-bottom: -3.2rem;
`;

const Sidebar: React.FC = () => {
  return (
    <StyledSidebar>
      <Logo />
      <NavBar>
        <NavList />
      </NavBar>

      <End>
        <Footer />
      </End>
    </StyledSidebar>
  );
};

export default Sidebar;
