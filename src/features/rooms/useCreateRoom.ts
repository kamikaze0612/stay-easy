import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createRoom as apiCreateRoom } from "../../services/apiRooms";
import { NewRoom } from "./CreateRoomForm";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  const { mutate: createRoom, isPending: isCreating } = useMutation({
    mutationFn: (newRoom: NewRoom) => apiCreateRoom(newRoom),
    onSuccess: () => {
      toast.success("New room successfully created");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createRoom, isCreating };
}
