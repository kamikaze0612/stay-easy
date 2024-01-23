import { useNavigate } from "react-router-dom";

import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Loader from "../../ui/Loader";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";

import { useBooking } from "./useBooking";
import { STATUS_TO_TAG_TYPE } from "../../utils/constants";
import BookingDetail from "./BookingDetail";

const BookingCheckin: React.FC = () => {
  const { booking, isLoading, error } = useBooking();
  const navigate = useNavigate();

  if (error) {
    console.error("ERROR");
    throw new Error("Booking could not be fetched");
  }

  if (isLoading || !booking) return <Loader />;

  return (
    <>
      <Row type="horizontal">
        <Heading>
          Check in booking #{booking.id}{" "}
          {booking.status && (
            <Tag type={STATUS_TO_TAG_TYPE?.[booking.status]}>
              {booking.status.replace("-", " ")}
            </Tag>
          )}
        </Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </Row>
      <Row type="vertical">
        {booking && <BookingDetail booking={booking} />}
      </Row>
      Check in {booking.fee}
    </>
  );
};

export default BookingCheckin;
