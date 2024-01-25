import { FormEvent, useState } from "react";
import { useLogin } from "./useLogin";
import styled from "styled-components";
import Logo from "../../ui/Logo";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
`;

const Container = styled.div`
  padding: 3.2rem;
  width: 54rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  padding: 2.4rem 0;
  text-align: center;
  font-size: 3rem;
  font-weight: 600;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-200);
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & label {
    font-size: 1.4rem;
    font-weight: 500;
  }

  & input {
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("jahof15645@wentcity.com");
  const [password, setPassword] = useState<string>("pass1234");

  const { login, isLoggingin } = useLogin();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email);
    console.log(password);
    login({ email, password });
  }

  return (
    <Background>
      <Container>
        <Logo />
        <Title>Log In</Title>
        <LoginForm onSubmit={handleSubmit}>
          <InputRow>
            <label htmlFor="email">Enter your email</label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="email"
            />
          </InputRow>
          <InputRow>
            <label htmlFor="password">Enter your password</label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type="password"
            />
          </InputRow>
          <Button size="big" disabled={isLoggingin} type="submit">
            Log in
          </Button>
        </LoginForm>
      </Container>
    </Background>
  );
};

export default Login;
