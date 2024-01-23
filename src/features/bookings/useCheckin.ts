import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as apiUpdateBooking } from "../../services/apiBookings";
import { Booking } from "../../pages/Bookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (id: string) => apiUpdateBooking(id, { status: "confirmed" }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("Check in failed"),
  });

  return { checkin, isCheckingIn };
}
