import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as apiUpdateBooking } from "../../services/apiBookings";
import { Booking } from "../../pages/Bookings";
import { useNavigate } from "react-router-dom";

export type CheckinParams = {
  id: string;
  breakfast:
    | {
        has_breakfast: boolean;
        extras_total_price: number;
        fee: number;
      }
    | object;
};

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ id, breakfast }: CheckinParams) =>
      apiUpdateBooking(id, {
        status: "confirmed",
        is_paid: true,
        ...breakfast,
      }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ queryKey: ["bookings", data.id] });
      navigate(-1);
    },
    onError: () => toast.error("Check in failed"),
  });

  return { checkin, isCheckingIn };
}
