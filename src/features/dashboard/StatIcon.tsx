import { ReactElement } from "react";
import styled from "styled-components";

type StatIconProps = {
  icon: ReactElement;
  color: string;
};

type IconCircleProps = {
  color: string;
};

const IconCircle = styled.span<IconCircleProps>`
  padding: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-${(props) => props.color}-700);
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`;

const StatIcon: React.FC<StatIconProps> = ({ icon, color }) => {
  return <IconCircle color={color}>{icon}</IconCircle>;
};

export default StatIcon;
