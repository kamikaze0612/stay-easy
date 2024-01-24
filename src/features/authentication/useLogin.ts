import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  LoginParams,
  login as apiLogin,
} from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingin } = useMutation({
    mutationFn: ({ email, password }: LoginParams) =>
      apiLogin({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("Error!", err);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoggingin };
}
