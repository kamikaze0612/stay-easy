import styled from "styled-components";

import Table from "../../ui/Table";
import { Room } from "../../pages/Rooms";
import formatCurrency from "../../utils/formatCurrency";

type RoomRowProps = {
  room: Room;
};

const Image = styled.img`
  width: 6.4rem;
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
    </Table.Row>
  );
};

export default RoomRow;