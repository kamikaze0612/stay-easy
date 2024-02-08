import { ComponentProps, ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  variation?: "primary" | "secondary" | "danger";
  size?: "small" | "normal" | "big";
  type?: string;
  children: ReactNode;
} & ComponentProps<"button">;

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
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

  danger: css`
    background-color: var(--color-red-700);
    color: var(--color-red-100);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  box-shadow: var(--shadow-sm);

  ${(props) => props?.size && sizes[props.size]}
  ${(props) => props?.variation && variations[props.variation]};
`;

StyledButton.defaultProps = {
  variation: "primary",
  size: "normal",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variation,
  size,
  onClick,
  type,
  disabled,
}) => {
  return (
    <StyledButton
      type={type}
      size={size}
      variation={variation}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
