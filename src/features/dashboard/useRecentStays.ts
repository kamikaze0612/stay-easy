import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

import { getStaysAfterDate } from "../../services/apiBookings";
import { FREEZE_DATE } from "../../utils/constants";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("range")
    ? Number(searchParams.get("range"))
    : 7;

  const targetDate = subDays(new Date(FREEZE_DATE), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(targetDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-out" || stay.status === "confirmed"
  );

  return { confirmedStays, isLoading, numDays, stays };
}
