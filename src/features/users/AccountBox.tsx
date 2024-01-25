import { ReactNode } from "react";
import styled from "styled-components";

import Subheading from "../../ui/Subheading";

type AccountBoxProps = {
  children: ReactNode;
  title: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const AccountBox: React.FC<AccountBoxProps> = ({ children, title }) => {
  return (
    <Container>
      <Subheading>{title}</Subheading>

      {children}
    </Container>
  );
};

export default AccountBox;
