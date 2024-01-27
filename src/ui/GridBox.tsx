import { ReactNode } from "react";
import styled from "styled-components";

type GridBoxProps = {
  children: ReactNode;
  columnLength?: string;
};

type StyledGridBoxProps = {
  columnLength?: string;
};

const StyledGridBox = styled.div<StyledGridBoxProps>`
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  grid-column: span ${(props) => props.columnLength};
`;

StyledGridBox.defaultProps = {
  columnLength: "1",
};

const GridBox: React.FC<GridBoxProps> = ({ children, columnLength }) => {
  return <StyledGridBox columnLength={columnLength}>{children}</StyledGridBox>;
};

export default GridBox;
