import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Booking } from "../../pages/Bookings";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Row from "../../ui/Row";
import Loader from "../../ui/Loader";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ButtonsGroup from "../../ui/ButtonGroup";

import BookingDataBox from "./BookingDataBox";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckout } from "./useCheckout";
import { useBooking } from "./useBooking";
import { STATUS_TO_TAG_TYPE } from "../../utils/constants";

const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const BookingDetail: React.FC = () => {
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { checkout, isCheckingOut } = useCheckout();

  const isWorking = isCheckingOut || isDeleting;

  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (!booking) return <Empty>There is no data to show</Empty>;

  const { status, id } = booking as Booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={STATUS_TO_TAG_TYPE[status]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonsGroup>
        {status === "unconfirmed" && (
          <Button
            disabled={isWorking}
            size="big"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check in
          </Button>
        )}
        {status === "confirmed" && (
          <Button
            disabled={isWorking}
            onClick={() => {
              checkout(id);
              navigate(-1);
            }}
            size="big"
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button disabled={isWorking} size="big" variation="danger">
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              onConfirm={() =>
                deleteBooking(id, { onSettled: () => navigate("/bookings") })
              }
              disabled={isWorking}
            />
          </Modal.Window>
        </Modal>
      </ButtonsGroup>
    </>
  );
};

export default BookingDetail;
