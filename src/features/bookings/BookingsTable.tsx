import { Booking } from "../../pages/Bookings";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

const BookingsTable: React.FC = () => {
  const { bookings, isLoading } = useBookings();

  if (isLoading) return <p>Loading...</p>;

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
    </Table>
  );
};

export default BookingsTable;
