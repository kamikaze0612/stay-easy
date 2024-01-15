import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    border: none;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
