import { NavLink } from "react-router-dom";
import { FaHome, FaKey, FaCog, FaAddressBook, FaUsers } from "react-icons/fa";
import styled from "styled-components";
import UploadData from "../data/UploadData";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  border-right: 1px solid var(--color-grey-100);
  padding: 4.8rem 1.6rem;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 16rem;
  align-self: center;
`;

const NavBar = styled.nav`
  padding: 3.2rem 1.6rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.8rem;
  padding: 1.6rem 2.4rem;
  border-radius: 0.8rem;
`;

const Sidebar: React.FC = () => {
  return (
    <StyledSidebar>
      <Logo src="img/logo-light.png" alt="Stay Easy Logo" />
      <NavBar>
        <NavList>
          <li>
            <StyledNavLink to="/dashboard">
              <FaHome /> Dashboard
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/rooms">
              <FaKey /> Rooms
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/bookings">
              <FaAddressBook /> Bookings
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/settings">
              <FaCog /> Settings
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/users">
              <FaUsers /> Users
            </StyledNavLink>
          </li>
        </NavList>
      </NavBar>

      <UploadData />
    </StyledSidebar>
  );
};

export default Sidebar;
