import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

type Option = {
  value: string;
  label: string;
};

type FilterTabProps = {
  fieldFilter: string;
  options: Option[];
};

type TabProps = {
  active: boolean;
};

const Container = styled.div`
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  display: flex;
  gap: 0.6rem;
  border: 1px solid var(--color-grey-100);
  font-size: 1.4rem;
`;

const Tab = styled.button<TabProps>`
  border-radius: var(--border-radius-sm);
  border: none;
  display: inline-block;
  padding: 0.8rem;
  font-weight: 500;
  background-color: var(--color-grey-0);
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: #fff;
    `}
`;

const FilterTab: React.FC<FilterTabProps> = ({ fieldFilter, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(fieldFilter) || options[0].value;

  function handleClick(value: string) {
    // Setting filter data to url
    searchParams.set(fieldFilter, value);

    // Setting page to 1 when filtering or sorting changed
    if (searchParams.get("page")) searchParams.set("page", "1");

    setSearchParams(searchParams);
  }

  return (
    <Container>
      {options.map((option: Option) => (
        <Tab
          key={option.value}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Tab>
      ))}
    </Container>
  );
};

export default FilterTab;
