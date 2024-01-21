import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  updateRoom as apiUpdateRoom,
  updateRoomParams,
} from "../../services/apiRooms";

export function useEditRoom() {
  const queryClient = useQueryClient();
  const { mutate: updateRoom, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, room }: updateRoomParams) => apiUpdateRoom({ id, room }),
    onSuccess: () => {
      toast.success("Room updated successfully");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => toast.error("Room could not be updated"),
  });

  return { updateRoom, isUpdating };
}
