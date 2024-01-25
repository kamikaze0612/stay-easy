import { ReactNode } from "react";
import styled from "styled-components";

type EmptyProps = {
  children: ReactNode;
};

const StyledEmpty = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--color-grey-500);
  padding: 3.2rem 0;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-200);
  border-left: 1px solid var(--color-grey-200);
  border-right: 1px solid var(--color-grey-200);
`;

const Empty: React.FC<EmptyProps> = ({ children }) => {
  return <StyledEmpty>{children}</StyledEmpty>;
};

export default Empty;
