import styled, { css } from "styled-components";

type ButtonProps = {
  type: "primary" | "secondary";
  size: "small" | "normal" | "big";
};

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,

  normal: css`
    font-size: 1.4rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,

  big: css`
    font-size: 1.6rem;
    padding: 1.6rem 3.2rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-brand-700);
    color: var(--color-brand-50);

    &:hover {
      background-color: var(--color-brand-800);
    }
  `,

  secondary: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-600);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-100);
    }
  `,
};

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.type]};
`;

Button.defaultProps = {
  type: "primary",
  size: "normal",
};

export default Button;
