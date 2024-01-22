import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  signup as apiSignup,
  signUpParams,
} from "../../services/apiAuthentication";

export function useSignup() {
  const { mutate: signup, isPending: isSigningup } = useMutation({
    mutationFn: (userData: signUpParams) => apiSignup(userData),
    onSuccess: () => toast.success("User signed up"),
    onError: () => toast.error("User could not be signed up"),
  });

  return { signup, isSigningup };
}
