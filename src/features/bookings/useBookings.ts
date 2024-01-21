import { useQuery } from "@tanstack/react-query";
import { getBookings as apiGetBookings } from "../../services/apiBookings";

export function useBookings() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: apiGetBookings,
  });

  return { bookings, isLoading };
}
