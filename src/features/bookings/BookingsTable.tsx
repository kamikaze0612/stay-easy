import { Booking } from "../../pages/Bookings";
import Empty from "../../ui/Empty";
import Loader from "../../ui/Loader";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

const BookingsTable: React.FC = () => {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading || !bookings) return <Loader />;
  if (!bookings || !bookings?.length) {
    return <Empty />;
  }

  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <span>Room</span>
        <span>Guest</span>
        <span>Date</span>
        <span>Status</span>
        <span>Amount</span>
        <span></span>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking: Booking) => (
          <BookingRow key={booking.id} booking={booking} />
        )}
      ></Table.Body>

      <Table.Footer>
        <Pagination count={count ? count : 0} />
      </Table.Footer>
    </Table>
  );
};

export default BookingsTable;
