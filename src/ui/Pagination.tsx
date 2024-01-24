import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { BOOKINGS_PER_PAGE } from "../utils/constants";

type PaginationProps = {
  count: number;
};

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationText = styled.p`
  font-size: 1.4rem;

  & span {
    font-weight: 600;
  }
`;

const PaginationButtonContainer = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: center;
`;

const PaginationButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0.6rem 1.2rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-grey-0);
  }
`;

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const pageCount = Math.ceil(count / BOOKINGS_PER_PAGE);

  function handleGoToNext() {
    if (currentPage === pageCount) return;

    searchParams.set("page", `${currentPage + 1}`);
    setSearchParams(searchParams);
  }

  function handleGoToPrev() {
    if (currentPage === 1) return;

    searchParams.set("page", `${currentPage - 1}`);
    setSearchParams(searchParams);
  }

  return (
    <PaginationContainer>
      <PaginationText>
        Showing <span>{(currentPage - 1) * BOOKINGS_PER_PAGE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * BOOKINGS_PER_PAGE}
        </span>{" "}
        results of <span>{count}</span>
      </PaginationText>
      <PaginationButtonContainer>
        <PaginationButton onClick={handleGoToPrev}>
          <FaArrowLeft /> Previous
        </PaginationButton>
        <PaginationButton onClick={handleGoToNext}>
          Next <FaArrowRight />
        </PaginationButton>
      </PaginationButtonContainer>
    </PaginationContainer>
  );
};

export default Pagination;
