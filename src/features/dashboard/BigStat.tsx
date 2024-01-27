import { ReactNode } from "react";
import styled from "styled-components";

type BigStatProps = {
  title: string;
  children: ReactNode;
};

const StyledBigStat = styled.div`
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 500;
`;

const BigStat: React.FC<BigStatProps> = ({ children, title }) => {
  return (
    <StyledBigStat>
      <Title>{title}</Title>
      {children}
    </StyledBigStat>
  );
};

export default BigStat;
