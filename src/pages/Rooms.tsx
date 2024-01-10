import { useEffect, useState } from "react";
import styled from "styled-components";

import supabase from "../services/supabase";
import Table from "../ui/Table";

const StyledRooms = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 600;
`;

type Room = {
  name: string;
  rooms_num: number;
  maxCapacity: number;
  description: string;
  price: number;
  discount: number;
  image: string;
};

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Array<Room>>();

  useEffect(() => {
    async function fetchRooms() {
      const { data: rooms, error } = await supabase.from("rooms").select("*");

      setRooms(rooms as Array<Room>);
      if (error) {
        console.log(error);
      }
    }

    fetchRooms();
  }, []);

  console.log(rooms);
  return (
    <StyledRooms>
      <Heading>Rooms</Heading>
      <Table columns=".6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <span></span>
          <span>Room</span>
          <span>Capacity</span>
          <span>Price</span>
          <span>Discount</span>
          <span></span>
        </Table.Header>
        <Table.Body data={rooms}></Table.Body>
      </Table>
    </StyledRooms>
  );
};

export default Rooms;
