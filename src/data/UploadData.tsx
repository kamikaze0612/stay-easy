import styled from "styled-components";

import Button from "../ui/Button";
import { useState } from "react";

import {
  apiCreateGuests,
  apiCreateBookings,
  apiCreateRooms,
  deleteRooms,
  deleteBookings,
  deleteGuests,
} from "../hooks/uploadData";

const Container = styled.div`
  padding: 2.4rem;
  background-color: var(--color-brand-200);
  margin-top: auto;
  border-radius: var(--border-radius-md);
  width: fit-content;
  align-self: center;
`;

const UploadData: React.FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  async function handleUpload() {
    setIsCreating(true);

    await deleteBookings();
    await deleteRooms();
    await deleteGuests();

    await apiCreateGuests();
    await apiCreateRooms();
    await apiCreateBookings();

    setIsCreating(false);
  }

  return (
    <Container>
      <Button onClick={handleUpload} disabled={isCreating}>
        Upload Data
      </Button>
    </Container>
  );
};

export default UploadData;
