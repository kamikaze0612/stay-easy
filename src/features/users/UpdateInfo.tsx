import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import AccountBox from "./AccountBox";
import { useUser } from "../authentication/useUser";
import { useUpdateUser } from "./useUpdateUser";
import Form from "../../ui/Form";

type InputFieldType = {
  fullName: string;
  image: File[] | string;
};

const UpdateInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InputFieldType>();

  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit: SubmitHandler<InputFieldType> = (data) => {
    if (data.image.length > 0 && typeof data.image !== "string") {
      console.log({ ...data, email: user?.email });
      updateUser({ avatar: data.image, fullName: data.fullName });
    } else updateUser({ fullName: data.fullName });
  };

  return (
    <AccountBox title="Update user data">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Email address">
          <Input type="email" defaultValue={user?.email} disabled={true} />
        </FormRow>
        <FormRow label="Full name" error={errors?.fullName}>
          <Input
            {...register("fullName")}
            type="text"
            defaultValue={user?.user_metadata.fullName}
          />
        </FormRow>
        <FormRow label="User image">
          <FileInput {...register("image")} accept="image/*" />
        </FormRow>
        <FormRow>
          <Button disabled={isUpdating} type="submit">
            Update information
          </Button>
        </FormRow>
      </Form>
    </AccountBox>
  );
};

export default UpdateInfo;
