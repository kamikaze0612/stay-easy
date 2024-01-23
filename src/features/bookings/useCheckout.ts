import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as apiUpdateBooking } from "../../services/apiBookings";
import { Booking } from "../../pages/Bookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (id: string) => apiUpdateBooking(id, { status: "checked-out" }),
    onSuccess: (data: Booking) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("Check out failed!"),
  });

  return { checkout, isCheckingOut };
}
