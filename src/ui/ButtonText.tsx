import styled from "styled-components";

const ButtonText = styled.button`
  color: var(--color-brand-700);
  font-weight: 500;
  font-size: 1.6rem;
  border: none;
  border-radius: var(--border-shadow-md);
  background-color: transparent;
  padding-bottom: 0.4rem;
  display: inline-block;
  border-bottom: 2px solid currentColor;
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-800);
  }
`;

export default ButtonText;
