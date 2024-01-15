import styled from "styled-components";

const FormRow = styled.div`
  padding: 1.6rem 0;
  display: grid;
  grid-template-columns: 28rem 1fr 1.2fr;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 0.3px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
export default FormRow;
