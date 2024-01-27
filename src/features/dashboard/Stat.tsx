import { ReactNode } from "react";
import styled from "styled-components";

type StatProps = {
  children: ReactNode;
  title: string;
  statText: string;
};

const StyledStat = styled.div`
  padding: 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: uppercase;
`;

const StatText = styled.p`
  font-size: 2rem;
  font-weight: 500;
`;

const Stat: React.FC<StatProps> = ({ children, title, statText }) => {
  return (
    <StyledStat>
      {children}
      <Stack>
        <Title>{title}</Title>
        <StatText>{statText}</StatText>
      </Stack>
    </StyledStat>
  );
};

export default Stat;
