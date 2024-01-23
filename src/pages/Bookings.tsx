import BookingsTable from "../features/bookings/BookingsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { Room } from "./Rooms";

export type Guest = {
  email: string;
  full_name: string;
  nationality: string;
  national_id: string;
  flag_icon: string;
  id: string;
};

export type Booking = {
  created_at: string;
  has_breakfast: boolean;
  id: string;
  start_date: string;
  end_date: string;
  stay_length: number;
  specification: string;
  guests_num: number;
  status: "unconfirmed" | "confirmed" | "checked-out";
  fee: number;
  room_total_price: number;
  extras_total_price: number;
  is_paid: boolean;
  guests: Guest;
  rooms: Room;
};

const Bookings: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
      </Row>

      <Row type="vertical">
        <BookingsTable />
      </Row>
    </>
  );
};

export default Bookings;
