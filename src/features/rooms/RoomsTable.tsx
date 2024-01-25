import { useSearchParams } from "react-router-dom";

import Table from "../../ui/Table";
import Loader from "../../ui/Loader";
import RoomRow from "./RoomRow";
import { Room } from "../../pages/Rooms";
import { useRooms } from "./useRooms";
import Menus from "../../ui/Menus";

const RoomTable: React.FC = () => {
  const { data: rooms, isLoading } = useRooms();

  const [searchParams] = useSearchParams();

  /********** FILTERING **********/
  const filterValue = searchParams.get("discount") || "all";

  let filteredRooms;

  if (filterValue === "all") filteredRooms = rooms;
  if (filterValue === "no-discount")
    filteredRooms = rooms?.filter((room: Room) => room.discount === 0);
  if (filterValue === "with-discount")
    filteredRooms = rooms?.filter((room: Room) => room.discount > 0);

  /********** SORTING **********/
  const sortValue = searchParams.get("sort") || "asc-name";
  const [direction, field] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedRooms = filteredRooms?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Menus>
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
          data={sortedRooms}
          render={(room: Room) => <RoomRow room={room} key={room.name} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
};

export default RoomTable;
