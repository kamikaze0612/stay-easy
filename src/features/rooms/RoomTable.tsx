import { useRooms } from "./useRooms";
import { Room } from "../../pages/Rooms";
import Table from "../../ui/Table";
import RoomRow from "./RoomRow";
import Loader from "../../ui/Loader";

const RoomTable: React.FC = () => {
  const { data: rooms, isLoading } = useRooms();

  return isLoading ? (
    <Loader />
  ) : (
    <Table columns=".6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <span></span>
        <span>Room</span>
        <span>Capacity</span>
        <span>Price</span>
        <span>Discount</span>
        <span></span>
      </Table.Header>
      <Table.Body
        data={rooms}
        render={(room: Room) => <RoomRow room={room} key={room.name} />}
      ></Table.Body>
    </Table>
  );
};

export default RoomTable;
