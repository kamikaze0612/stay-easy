import styled from "styled-components";

const IconButton = styled.button`
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  border: none;
  color: var(--color-brand-600);

  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-grey-0);
  }
`;

export default IconButton;
