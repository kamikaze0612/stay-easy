import Heading from "../../ui/Heading";
import Loader from "../../ui/Loader";
import Row from "../../ui/Row";
import BookingDetail from "./BookingDetail";
import { useBooking } from "./useBooking";

const Booking: React.FC = () => {
  const { booking, isLoading, error } = useBooking();

  if (error) {
    console.error("ERROR");
    throw new Error("Booking could not be fetched");
  }

  if (isLoading || !booking) return <Loader />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Booking #{booking.id}</Heading>
      </Row>
      {booking && <BookingDetail booking={booking} />}
    </>
  );
};

export default Booking;
