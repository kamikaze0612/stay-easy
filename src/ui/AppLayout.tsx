import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <>
      <h1>AppLayout</h1>
      <Outlet />
    </>
  );
};

export default AppLayout;
