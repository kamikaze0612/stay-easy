import styled from "styled-components";

import { FaTrash } from "react-icons/fa";

import Table from "../../ui/Table";
import { Booking } from "../../pages/Bookings";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";

type BookingRowProps = {
  booking: Booking;
};

const RoomName = styled.h3`
  font-size: 1.8rem;
  font-family: "Sono", sans-serif;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    font-size: 1.2rem;
    color: var(--color-grey-500);
  }
`;

const FeeAmount = styled.p`
  font-family: "Sono";
  font-weight: 500;
`;

const STATUS_TO_TAG_TYPE = {
  unconfirmed: "blue",
  confirmed: "green",
  "checked-out": "gray",
};

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  return (
    <Table.Row>
      <RoomName>{booking.rooms.name}</RoomName>
      <Stacked>
        <span>{booking.guests.full_name}</span>
        <span>{booking.guests.email}</span>
      </Stacked>
      <Stacked>
        <span>
          {(isToday(new Date(booking.start_date))
            ? "Today"
            : formatDistanceFromNow(booking.start_date)) || "hello"}{" "}
          &rarr; {booking.stay_length} night stay
        </span>
        <span>
          {format(new Date(booking.start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking.end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={STATUS_TO_TAG_TYPE[booking.status]}>
        {booking.status.replace("-", "")}
      </Tag>

      <FeeAmount>{formatCurrency(booking.fee)}</FeeAmount>

      <Menus>
        <Menus.Toggle id="hello"></Menus.Toggle>

        <Menus.List id="hello">
          <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
        </Menus.List>
      </Menus>
    </Table.Row>
  );
};

export default BookingRow;
