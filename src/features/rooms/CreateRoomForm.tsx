import { SubmitHandler, useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import TextArea from "../../ui/TextArea";
import { Room } from "../../pages/Rooms";
import { useCreateRoom } from "./useCreateRoom";
import { useEditRoom } from "./useEditRoom";

export type NewRoom = {
  id: string;
  name: string;
  rooms_num: number;
  maxCapacity: number;
  description: string;
  price: number;
  discount: number;
  image: File;
};

type CreateRoomFormProps = {
  onCloseModal?: () => void;
  roomToEdit?: Room;
};

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({
  onCloseModal,
  roomToEdit = {} as Room,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Room>();

  const isEditSession = Boolean(roomToEdit?.id);

  const { createRoom, isCreating } = useCreateRoom();
  const { updateRoom, isUpdating } = useEditRoom();

  const isWorking = isCreating || isUpdating;

  const onSubmit: SubmitHandler<Room> = (data) => {
    if (roomToEdit?.id) {
      if (Object.keys(data.image).length > 0) {
        updateRoom({
          id: roomToEdit.id,
          room: { ...data, image: data.image[0] },
        });
      } else
        updateRoom({
          id: roomToEdit.id,
          room: { ...data, image: roomToEdit.image },
        });
      if (Object.keys(errors).length === 0) onCloseModal?.();
      return;
    }

    createRoom({ ...data, image: data.image[0] as unknown as File });
    if (Object.keys(errors).length === 0) onCloseModal?.();
  };

  if (Object.keys(errors).length > 0) console.log(errors);

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Room name" id="name" error={errors?.name}>
        <Input
          disabled={isWorking}
          id="name"
          type="text"
          defaultValue={roomToEdit?.name}
          placeholder="Name"
          {...register("name", {
            required: "Name must be provided",
            maxLength: {
              value: 20,
              message: "Name must be under 20 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        id="maxCapacity"
        error={errors?.maxCapacity}
      >
        <Input
          disabled={isWorking}
          id="maxCapacity"
          type="number"
          defaultValue={roomToEdit?.maxCapacity}
          step={1}
          placeholder="Maximum capacity"
          {...register("maxCapacity", {
            required: "Maximum capacity must be provided",
            min: {
              value: 1,
              message: "Maximum capacity must be greater than 1",
            },
            max: {
              value: 20,
              message: "Maximum capacity should be less than 20",
            },
          })}
        />
      </FormRow>

      <FormRow label="Number of rooms" id="rooms_num" error={errors?.rooms_num}>
        <Input
          disabled={isWorking}
          id="rooms_num"
          type="number"
          defaultValue={roomToEdit?.rooms_num}
          step={1}
          placeholder="Number of rooms"
          {...register("rooms_num", {
            required: "Number of rooms must be provided",
            min: {
              value: 1,
              message: "Number of rooms must be greater than 1",
            },
            max: {
              value: 10,
              message: "Number of rooms must be less than 10",
            },
          })}
        />
      </FormRow>

      <FormRow label="Price of room" id="price" error={errors?.price}>
        <Input
          disabled={isWorking}
          id="price"
          type="number"
          defaultValue={roomToEdit?.price}
          placeholder="Regular price"
          {...register("price", {
            required: "Price of room must be provided",
            min: {
              value: 10,
              message: "Price must be greather than 10",
            },
            max: {
              value: 1000,
              message: "Price must be less than 1000",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount for room" id="discount" error={errors?.discount}>
        <Input
          disabled={isWorking}
          id="discount"
          type="number"
          defaultValue={roomToEdit?.discount || 0}
          min={0}
          max={1000000}
          {...register("discount", {
            min: {
              value: 0,
              message: "Discount must be greather or equal to 0",
            },
            validate: (value) =>
              +value <= +getValues().price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for room"
        id="description"
        error={errors?.description}
      >
        <TextArea
          disabled={isWorking}
          rows={3}
          id="description"
          placeholder="Description"
          defaultValue={roomToEdit?.description}
          {...register("description", {
            required: "Description for room must be provided",
            minLength: {
              value: 5,
              message: "Description must be use at least 5 characters",
            },
            maxLength: {
              value: 1000,
              message: "Description must be under 1000 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Room image" id="image" error={errors?.image}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Image of room must be provided",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit">
          {roomToEdit?.id ? "Update room" : "Create new room"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateRoomForm;
