import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";

const StyledUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
`;

const FullName = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
`;

const User: React.FC = () => {
  const { user } = useUser();

  return (
    <StyledUser>
      <Avatar src={user?.user_metadata.avatar} />
      <FullName>{user?.user_metadata.fullName}</FullName>
    </StyledUser>
  );
};

export default User;
