import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateParams,
  updateCurrentUser,
} from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({ password, fullName, avatar }: UpdateParams) =>
      updateCurrentUser({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success("User data successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => toast.error("User data could not be updated"),
  });

  return { updateUser, isUpdating };
}
