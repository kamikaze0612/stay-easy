import { ReactNode } from "react";
import styled from "styled-components";

type CheckboxProps = {
  id: string;
  children: ReactNode;
  disabled?: boolean;
  checked: boolean;
  onChange: () => void;
};

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 2px;
    outline-offset: 2px;
    accent-color: var(--color-brand-600);
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-grey-600);
  }

  & label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
`;
const Checkbox: React.FC<CheckboxProps> = ({
  id,
  children,
  disabled = false,
  checked,
  onChange,
}) => {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={disabled ? "" : id}>{children}</label>
    </StyledCheckbox>
  );
};

export default Checkbox;
