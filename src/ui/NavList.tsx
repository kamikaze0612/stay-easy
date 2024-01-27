import { FaAddressBook, FaCog, FaHome, FaKey, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavList = styled.ul`
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

const NavList: React.FC = () => {
  return (
    <StyledNavList>
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
    </StyledNavList>
  );
};

export default NavList;
