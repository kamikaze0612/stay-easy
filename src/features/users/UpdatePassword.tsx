import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import AccountBox from "./AccountBox";
import { useUpdateUser } from "./useUpdateUser";
import Form from "../../ui/Form";

type InputValuesType = {
  password: string;
  confirmPassword: string;
};

const UpdatePassword: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<InputValuesType>();

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit: SubmitHandler<InputValuesType> = (data) => {
    updateUser({ password: data.password });
  };

  return (
    <AccountBox title="Update user password">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="New password" error={errors?.password}>
          <Input
            type="password"
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password length must be at least 8 characters",
              },
              required: "Password field must not be empty",
            })}
          />
        </FormRow>
        <FormRow label="Confirm password" error={errors?.confirmPassword}>
          <Input
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues().password ||
                "Please insert same password as above",
              required: "Please repeat password inserted above",
            })}
          />
        </FormRow>
        <FormRow>
          <Button
            disabled={isUpdating}
            type="reset"
            onClick={() => reset()}
            variation="secondary"
          >
            Cancel
          </Button>
          <Button disabled={isUpdating} type="submit">
            Update password
          </Button>
        </FormRow>
      </Form>
    </AccountBox>
  );
};

export default UpdatePassword;
