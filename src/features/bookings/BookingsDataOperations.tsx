import styled from "styled-components";
import FilterTab from "../../ui/FilterTab";
import Select from "../../ui/Select";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const BookingsDataOperations: React.FC = () => {
  return (
    <Container>
      <FilterTab
        fieldFilter="status"
        options={[
          { value: "all", label: "All" },
          { value: "unconfirmed", label: "Unconfirmed" },
          { value: "confirmed", label: "Confirmed" },
          { value: "checked-out", label: "Checked out" },
        ]}
      />
      <Select
        options={[
          { value: "asc-fee", label: "Sort by amount to pay (low first)" },
          { value: "desc-fee", label: "Sort by amount to pay (high first)" },
          { value: "asc-date", label: "Sort by arrival date (early first)" },
          { value: "desc-date", label: "Sort by arrival date (far first)" },
        ]}
      />
    </Container>
  );
};

export default BookingsDataOperations;
