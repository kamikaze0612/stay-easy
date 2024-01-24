import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
};

const StyledSelect = styled.select`
  padding: 0.6rem 1.6rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  font-weight: 500;
`;

const Select: React.FC<SelectProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(value: string) {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={options[0].value}
    >
      {options.map((option: Option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
