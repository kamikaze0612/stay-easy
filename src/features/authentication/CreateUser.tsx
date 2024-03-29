import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import { User } from "../../pages/Users";
import { useSignup } from "./useSignup";

const CreateUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<User>();

  const { signup, isSigningup } = useSignup();

  const onSubmit: SubmitHandler<User> = (user) => {
    signup(user);
  };

  return (
    <Form type="regular" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName} id="fullName">
        <Input
          disabled={isSigningup}
          id="fullName"
          type="text"
          placeholder="John Doe"
          {...register("fullName", {
            required: "User's full name must be provided",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email} id="email">
        <Input
          disabled={isSigningup}
          id="email"
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

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password}
        id="password"
      >
        <Input
          disabled={isSigningup}
          id="password"
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

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm}
        id="passwordConfirm"
      >
        <Input
          disabled={isSigningup}
          id="passwordConfirm"
          type="password"
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues().password || "Confirm password is incorrect",
          })}
        />
      </FormRow>

      <FormRow label="User avatar (optional)" id="image">
        <FileInput
          disabled={isSigningup}
          accept="image/*"
          id="image"
          {...register("avatar")}
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
