import styled from "styled-components";

import FilterTab from "../../ui/FilterTab";
import Select from "../../ui/Select";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const RoomsDataOperations: React.FC = () => {
  return (
    <Container>
      <FilterTab
        fieldFilter="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <Select
        options={[
          { value: "asc-name", label: "Sort by name (A-Z)" },
          { value: "desc-name", label: "Sort by name (Z-A)" },
          { value: "asc-price", label: "Sort by price (low first)" },
          { value: "desc-price", label: "Sort by price (high first)" },
        ]}
      />
    </Container>
  );
};

export default RoomsDataOperations;
