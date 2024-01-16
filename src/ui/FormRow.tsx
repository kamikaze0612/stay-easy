import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import styled from "styled-components";

type FormRowProps = {
  label?: string;
  children: ReactNode;
  id?: string;
  error?: FieldError;
};

const StyledFormRow = styled.div`
  padding: 1.6rem 0;
  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  column-gap: 2.4rem;
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

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  color: var(--color-red-700);
  line-height: 1.5;
`;

const FormRow: React.FC<FormRowProps> = ({ children, label, id, error }) => {
  return (
    <StyledFormRow>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <Error>{error.message}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
