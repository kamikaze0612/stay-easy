import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { User } from "../../pages/Users";

const CreateUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (user) => {
    console.log(user);
  };

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName}>
        <Input
          type="text"
          placeholder="John Doe"
          {...register("fullName", {
            required: "User's full name must be provided",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email}>
        <Input
          type="email"
          placeholder="johndoe@example.com"
          {...register("email", {
            required: "User's email must be provided",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password}>
        <Input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be longer than 8 characters",
            },
            maxLength: {
              value: 32,
              message: "Password must be under 32 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errors?.passwordConfirm}>
        <Input
          type="password"
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues().password || "Confirm password is incorrect",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Clear fields
        </Button>
        <Button type="submit">Create new user</Button>
      </FormRow>
    </Form>
  );
};

export default CreateUser;
