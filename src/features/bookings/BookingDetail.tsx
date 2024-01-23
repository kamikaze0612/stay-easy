import styled from "styled-components";
import { format } from "date-fns";
import { FaKey, FaCoffee, FaMoneyBill } from "react-icons/fa";

import { Booking } from "../../pages/Bookings";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Flag from "../../ui/Flag";

type BookingDetailProps = {
  booking: Booking;
};

const StyledBookingDetail = styled.div`
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.div`
  background-color: var(--color-brand-500);
  color: var(--color-brand-100);
  padding: 3.2rem 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1.2rem;
  font-weight: 600;
`;

const Body = styled.div`
  padding: 3.2rem 4.8rem;
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  & svg {
    color: var(--color-brand-500);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Bold = styled.p`
  font-weight: 500;
`;

const Light = styled.p`
  color: var(--color-grey-500);
`;

const Highlighted = styled.div`
  padding: 2.4rem 3.2rem;
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--border-radius-md);

  & svg {
    color: var(--color-yellow-700);
  }
`;

const End = styled.p`
  align-self: flex-end;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  width: fit-content;
`;

const BookingDetail: React.FC<BookingDetailProps> = ({ booking }) => {
  const {
    stay_length,
    rooms: { name },
    start_date,
    end_date,
    guests: { flag_icon, full_name, email, national_id },
    guests_num,
    has_breakfast,
    fee,
    is_paid,
    created_at,
  } = booking;

  return (
    <StyledBookingDetail>
      <Header>
        <FlexRow>
          <FaKey />
          <p>
            {stay_length} nights in Room #{name}
          </p>
        </FlexRow>
        <p>
          {start_date && format(new Date(start_date), "EEE, MMM dd yyyy ")} (
          {formatDistanceFromNow(start_date)}) &mdash;{" "}
          {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>
      </Header>
      <Body>
        <Row role="row">
          <Flag src={flag_icon} />
          <Bold>
            {full_name} + {+guests_num - 1} guests
          </Bold>
          <span>•</span>
          <Light>{email}</Light>
          <span>•</span>
          <Light>National ID {national_id}</Light>
        </Row>
        <Row>
          <FaCoffee />
          <Bold>Breakfast included?</Bold>
          <Light>{has_breakfast ? "Yes" : "No"}</Light>
        </Row>
        <Highlighted>
          <Row>
            <FaMoneyBill />
            <Bold>Total Price</Bold>
            <p>{formatCurrency(+fee)}</p>
          </Row>
          <Bold>{is_paid ? "PAID" : "WILL PAY AT PROPERTY"}</Bold>
        </Highlighted>

        <End>Booked on {format(new Date(created_at), "EEE, MMM dd yyyy")}</End>
      </Body>
    </StyledBookingDetail>
  );
};

export default BookingDetail;
