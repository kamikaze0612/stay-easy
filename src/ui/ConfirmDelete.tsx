import styled from "styled-components";
import Button from "./Button";

type ConfirmDeleteProps = {
  onConfirm: () => void;
  disabled: boolean;
  onCloseModal?: () => void;
};

const StyledConfirmDelete = styled.div`
  width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Heading = styled.h3`
  font-size: 2rem;
  font-weight: 600;
`;

const Text = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-500);
  line-height: 1.6;
`;

const ButtonsContainer = styled.span`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  onConfirm,
  disabled,
  onCloseModal,
}) => {
  return (
    <StyledConfirmDelete>
      <Heading>Delete room</Heading>
      <Text>
        Are you sure want to delete this room? This action cannot be undone
      </Text>
      <ButtonsContainer>
        <Button
          disabled={disabled}
          variation="secondary"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={disabled} variation="danger" onClick={onConfirm}>
          Delete
        </Button>
      </ButtonsContainer>
    </StyledConfirmDelete>
  );
};

export default ConfirmDelete;
