import { fetchMonthlyMemberSubscriptions } from "../../api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMonthlyMemberSubscriptionsData = (memberId: string) => {
  return useQuery({
    queryKey: ["member-monthly-subscription", memberId],
    queryFn: () => fetchMonthlyMemberSubscriptions(memberId),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
};