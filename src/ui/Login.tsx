import { FormEvent, useState } from "react";
import { useLogin } from "../features/authentication/useLogin";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, isLoggingin } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Enter your email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password">Enter your password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />
      </div>
      <button disabled={isLoggingin} type="submit">
        Log in
      </button>
    </form>
  );
};

export default Login;
