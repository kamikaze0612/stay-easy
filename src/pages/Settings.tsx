import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const Settings: React.FC = () => {
  return (
    <Row type="vertical">
      <Heading>Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
