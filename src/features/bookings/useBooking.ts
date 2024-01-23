import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking as apiGetBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => apiGetBooking(bookingId),
  });

  return { booking, isLoading, error };
}
