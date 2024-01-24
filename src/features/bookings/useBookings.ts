import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings as apiGetBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { BOOKINGS_PER_PAGE } from "../../utils/constants";

export type QueryFeatures = {
  filter: {
    field: string;
    value: string;
  } | null;
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
};

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERING
  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };

  // SORTING
  const sortValue = searchParams.get("sort") || "asc-fee";
  const [direction, field] = sortValue.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // QUERYING
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => apiGetBookings({ filter, sortBy, page }),
  });

  // PREFETCHING FOR PREVIOUS NEXT PAGES
  const pageCount = data?.count && Math.ceil(data?.count / BOOKINGS_PER_PAGE);

  if (pageCount && page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => apiGetBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => apiGetBookings({ filter, sortBy, page: page - 1 }),
    });
  return { bookings: data?.bookings, isLoading, count: data?.count, error };
}
