import RoomsTable from "../features/rooms/RoomsTable";
import Row from "../ui/Row";
import AddRoom from "../features/rooms/AddRoom";
import Heading from "../ui/Heading";
import RoomsDataOperations from "../features/rooms/RoomsDataOperations";

export type Room = {
  id: string;
  name: string;
  rooms_num: number;
  maxCapacity: number;
  description: string;
  price: number;
  discount: number;
  image: string;
};

const Rooms: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading>Rooms</Heading>
        <RoomsDataOperations />
      </Row>

      <Row type="vertical">
        <RoomsTable />
        <AddRoom />
      </Row>
    </>
  );
};

export default Rooms;
