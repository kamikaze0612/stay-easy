import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import Loader from "./Loader";

type ProtectedRouteProps = {
  children: ReactNode;
};

const Body = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <Body>
        <Loader />
      </Body>
    );

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
