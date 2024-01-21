import CreateUser from "../features/authentication/CreateUser";

export type User = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatar: string;
};

const Users: React.FC = () => {
  return (
    <>
      <CreateUser />
    </>
  );
};

export default Users;
