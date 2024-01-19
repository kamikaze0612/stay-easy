import CreateUser from "../features/users/CreateUser";

export type User = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const Users: React.FC = () => {
  return (
    <>
      <CreateUser />
    </>
  );
};

export default Users;
