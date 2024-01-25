import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import {
  FaTrash,
  FaRegCaretSquareDown,
  FaRegCaretSquareUp,
  FaEye,
} from "react-icons/fa";

import Table from "../../ui/Table";
import { Booking } from "../../pages/Bookings";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckout } from "./useCheckout";
import { STATUS_TO_TAG_TYPE } from "../../utils/constants";

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

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  return (
    <Table.Row>
      <RoomName>{booking?.rooms?.name}</RoomName>
      <Stacked>
        <span>{booking?.guests?.full_name}</span>
        <span>{booking?.guests?.email}</span>
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
        {booking.status.replace("-", " ")}
      </Tag>

      <FeeAmount>{formatCurrency(booking.fee)}</FeeAmount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={`${booking.id}`}></Menus.Toggle>

          <Menus.List id={`${booking.id}`}>
            {booking.status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${booking.id}`)}
                icon={<FaRegCaretSquareDown />}
              >
                Check in
              </Menus.Button>
            )}

            {booking.status === "confirmed" && (
              <Menus.Button
                disabled={isCheckingOut}
                onClick={() => checkout(booking.id)}
                icon={<FaRegCaretSquareUp />}
              >
                Check out
              </Menus.Button>
            )}

            <Menus.Button
              onClick={() => navigate(`/bookings/${booking.id}`)}
              icon={<FaEye />}
            >
              Details
            </Menus.Button>

            <Modal.Open opens="deleteBooking">
              <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              title="Delete booking"
              disabled={isDeleting}
              onConfirm={() => deleteBooking(booking.id)}
            >
              Are you sure to delete this booking? This action cannot be undone
            </ConfirmDelete>
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
