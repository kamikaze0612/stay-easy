import { useQuery } from "@tanstack/react-query";
import { getTodaysActivities } from "../../services/apiBookings";

export function useTodaysActivities() {
  const { data: todaysBookings, isLoading } = useQuery({
    queryKey: ["bookings", `${Date.toString()}`],
    queryFn: () => getTodaysActivities(),
  });

  return { todaysBookings, isLoading };
}
