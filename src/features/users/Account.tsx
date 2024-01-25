import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import UpdateInfo from "./UpdateInfo";
import UpdatePassword from "./UpdatePassword";

const Account: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Update your account information</Heading>
      </Row>

      <Row type="vertical">
        <UpdateInfo />
        <UpdatePassword />
      </Row>
    </>
  );
};

export default Account;
