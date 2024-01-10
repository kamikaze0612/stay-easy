import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 3.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
`;

const Header: React.FC = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
