import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Settings } from "./UpdateSettingsForm";
import { updateSettings as apiUpdateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (freshSettings: Settings) => apiUpdateSettings(freshSettings),
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSettings, isUpdating };
}
