import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking as apiGetBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams<string>();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => apiGetBooking(bookingId),
    retry: false,
  });

  return { booking, isLoading, error };
}
