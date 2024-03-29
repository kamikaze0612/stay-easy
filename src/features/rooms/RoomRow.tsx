import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";

import Table from "../../ui/Table";
import { Room } from "../../pages/Rooms";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CreateRoomForm from "./CreateRoomForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteRoom } from "./useDeleteRoom";

type RoomRowProps = {
  room: Room;
};

const Image = styled.img`
  width: 6.4rem;
  height: 4.8rem;
  object-fit: cover;
  object-position: center;
  transform: scale(1.6);
`;

const Number = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Sono";
`;

const Name = styled(Number)`
  text-transform: uppercase;
`;

const Capacity = styled.p``;

const Price = styled(Number)``;

const Discount = styled(Number)`
  color: var(--color-green-700);
`;

const RoomRow: React.FC<RoomRowProps> = ({ room }) => {
  const { deleteRoom, isDeleting } = useDeleteRoom();

  return (
    <Table.Row>
      <Image src={room?.image} alt={`${room?.name} image`} />
      <Name>{room.name}</Name>
      <Capacity>Fits up to {room.maxCapacity} guests</Capacity>
      <Price>{formatCurrency(room.price)}</Price>
      <Discount>
        {room.discount
          ? formatCurrency(room.discount)
          : String.fromCharCode(0x2014)}
      </Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={`${room.id}`} />

            <Menus.List id={`${room.id}`}>
              <Modal.Open opens="editRoom">
                <Menus.Button icon={<FaEdit />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="deleteRoom">
                <Menus.Button icon={<FaTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="editRoom">
              <CreateRoomForm roomToEdit={room} />
            </Modal.Window>
            <Modal.Window name="deleteRoom">
              <ConfirmDelete
                disabled={isDeleting}
                onConfirm={() => deleteRoom(room.id)}
                title="Delete room"
              >
                Are you sure to delete this room? This action cannot be undone
              </ConfirmDelete>
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default RoomRow;
