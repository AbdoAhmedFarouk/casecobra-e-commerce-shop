import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "./actions";

export function useGetAuthStatus() {
  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  return { data };
}
