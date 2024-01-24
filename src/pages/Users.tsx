import CreateUser from "../features/authentication/CreateUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

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
      <Row type="horizontal">
        <Heading>Create an user</Heading>
      </Row>

      <CreateUser />
    </>
  );
};

export default Users;
