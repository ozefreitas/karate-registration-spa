import { useQuery } from "@tanstack/react-query";
import { MembershipsService } from "../../openapi";

export const useFetchMemberShipsData = (
  userRole: string,
  page: number,
  pageSize: number,
  ordering?: string,
) => {
  return useQuery({
    queryKey: ["member-ships", userRole, page, pageSize, ordering],
    queryFn: () => MembershipsService.membershipsList(ordering, page, pageSize),
    refetchOnWindowFocus: false,
    enabled: ["subed_club"].includes(userRole),
  });
};
