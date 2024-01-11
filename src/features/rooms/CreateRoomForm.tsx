import { FormEvent } from "react";

const CreateRoomForm: React.FC = () => {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return <form onSubmit={handleSubmit}></form>;
};

export default CreateRoomForm;
