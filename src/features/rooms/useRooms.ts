import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export function useRooms() {
  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return { isLoading, data };
}
