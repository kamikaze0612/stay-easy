import { Resolver, SubmitHandler, useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { Room } from "../../pages/Rooms";
import { useCreateRoom } from "./useCreateRoom";

type CreateRoomFormProps = {
  onCloseModal?: () => void;
};

const resolver: Resolver<Room> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Name must be provided",
          },
        }
      : {},
  };
};

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Room>({ resolver });

  const { createRoom, isCreating } = useCreateRoom();

  console.log(isCreating);
  console.log(errors);

  const onSubmit: SubmitHandler<Room> = (data) => {
    createRoom(data);
  };

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow>
        <Label htmlFor="name">Room name</Label>
        <Input id="name" type="text" placeholder="Name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          id="maxCapacity"
          type="number"
          step={1}
          placeholder="Maximum capacity"
          {...register("maxCapacity")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="rooms_num">Number of rooms</Label>
        <Input
          id="rooms_num"
          type="number"
          step={1}
          placeholder="Number of rooms"
          {...register("rooms_num")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="price">Price of room</Label>
        <Input
          id="price"
          type="number"
          min={0}
          max={1000000}
          placeholder="Regular price"
          {...register("price")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount for room</Label>
        <Input
          id="discount"
          type="number"
          defaultValue={0}
          min={0}
          max={1000000}
          {...register("discount", {
            validate: (value) =>
              value <= getValues().price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for room</Label>
        <Input
          id="description"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Room image</Label>
        <FileInput id="image" {...register("image")} />
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
