import { SubmitHandler, useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { Room } from "../../pages/Rooms";
import { useCreateRoom } from "./useCreateRoom";
import TextArea from "../../ui/TextArea";

type CreateRoomFormProps = {
  onCloseModal?: () => void;
};

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Room>();

  const { createRoom, isCreating } = useCreateRoom();

  const onSubmit: SubmitHandler<Room> = (data) => {
    createRoom(data);
  };

  if (Object.keys(errors).length > 0) console.log(errors);

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Room name" id="name" error={errors?.name}>
        {/* <Label htmlFor="name">Room name</Label> */}
        <Input
          disabled={isCreating}
          id="name"
          type="text"
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
        {/* <Label htmlFor="maxCapacity">Maximum capacity</Label> */}
        <Input
          disabled={isCreating}
          id="maxCapacity"
          type="number"
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
        {/* <Label htmlFor="rooms_num">Number of rooms</Label> */}
        <Input
          disabled={isCreating}
          id="rooms_num"
          type="number"
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
        {/* <Label htmlFor="price">Price of room</Label> */}
        <Input
          disabled={isCreating}
          id="price"
          type="number"
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
        {/* <Label htmlFor="discount">Discount for room</Label> */}
        <Input
          disabled={isCreating}
          id="discount"
          type="number"
          defaultValue={0}
          min={0}
          max={1000000}
          {...register("discount", {
            min: {
              value: 0,
              message: "Discount must be greather or equal to 0",
            },
            validate: (value) =>
              value <= getValues().price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for room"
        id="description"
        error={errors?.description}
      >
        {/* <Label htmlFor="description">Description for room</Label> */}
        <TextArea
          disabled={isCreating}
          rows={3}
          id="description"
          placeholder="Description"
          {...register("description", {
            required: "Description for room must be provided",
            minLength: {
              value: 5,
              message: "Description must be use at least 5 characters",
            },
            maxLength: {
              value: 100,
              message: "Description must be under 100 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Room image" id="image" error={errors?.image}>
        {/* <Label htmlFor="image">Room image</Label> */}
        <FileInput
          id="image"
          {...register("image", {
            required: "Image of room must be provided",
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
        <Button type="submit">Create new room</Button>
      </FormRow>
    </Form>
  );
};

export default CreateRoomForm;
