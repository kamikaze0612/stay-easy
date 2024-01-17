import { FormEventHandler, ReactNode } from "react";

import Form from "../../ui/Form";

type SettingsFormProps = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const SettingsForm: React.FC<SettingsFormProps> = ({ children, onSubmit }) => {
  return (
    <Form onSubmit={onSubmit} type="regular">
      {children}
    </Form>
  );
};

export default SettingsForm;
