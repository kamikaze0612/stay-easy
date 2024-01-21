import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteRoom as apiDeleteRoom } from "../../services/apiRooms";

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  const { mutate: deleteRoom, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => apiDeleteRoom(id),
    onSuccess: () => {
      toast.success("Room successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: () => toast.error("Room cannot be deleted"),
  });

  return { deleteRoom, isDeleting };
}
