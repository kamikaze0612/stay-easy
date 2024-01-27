import { useQuery } from "@tanstack/react-query";

import { getTodaysActivities } from "../../services/apiBookings";

export function useTodaysActivities() {
  const { data: todaysBookings, isLoading } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getTodaysActivities,
  });

  return { todaysBookings, isLoading };
}
