import { ReactNode } from "react";
import styled, { css } from "styled-components";

type RowProps = {
  children: ReactNode;
  type: "vertical" | "horizontal";
};

type StyledRowProps = {
  type: "vertical" | "horizontal";
};

const StyledRow = styled.div<StyledRowProps>`
  display: flex;

  ${(props) =>
    props?.type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
    `}

  ${(props) =>
    props?.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 3.2rem;
    `}
`;

StyledRow.defaultProps = {
  type: "vertical",
};

const Row: React.FC<RowProps> = ({ children, type }) => {
  return <StyledRow type={type}>{children}</StyledRow>;
};

export default Row;
