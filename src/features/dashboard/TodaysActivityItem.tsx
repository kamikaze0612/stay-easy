import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Tag from "../../ui/Tag";
import Flag from "../../ui/Flag";
import Button from "../../ui/Button";
import { useCheckout } from "../bookings/useCheckout";

type TodaysActivityItemProps = {
  flag: string;
  fullName: string;
  status: string;
  stayLength: number;
  bookingId: string;
};

const StyledTodaysActivityItem = styled.li`
  padding: 1.2rem 0;
  border-top: 1px solid var(--color-grey-100);
  display: grid;
  grid-template-columns: 9.6rem 4rem 19.6rem 1fr 1fr;
  align-items: center;

  &:last-child {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Name = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
`;

const Duration = styled.p`
  font-size: 1.4rem;
`;

const TypeToFilter = {
  unconfirmed: "blue",
  confirmed: "green",
};

const TodaysActivityItem: React.FC<TodaysActivityItemProps> = ({
  flag,
  fullName,
  status,
  stayLength,
  bookingId,
}) => {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const color =
    status === "unconfirmed" || status === "confirmed"
      ? TypeToFilter[status]
      : "";

  return (
    <StyledTodaysActivityItem>
      <Tag type={color}>
        {status === "unconfirmed" ? "Arriving" : "Departing"}
      </Tag>
      <Flag src={flag} />
      <Name>{fullName}</Name>
      <Duration>{stayLength} nights</Duration>
      {status === "unconfirmed" && (
        <Button onClick={() => navigate(`/checkin/${bookingId}`)} size="small">
          Check in
        </Button>
      )}
      {status === "confirmed" && (
        <Button
          size="small"
          disabled={isCheckingOut}
          onClick={() => checkout(bookingId)}
        >
          Check out
        </Button>
      )}
    </StyledTodaysActivityItem>
  );
};

export default TodaysActivityItem;
