import {
  fetchMonthlyMemberSubscriptions,
  fetchMonthlyPaymentPlans,
  fetchSingleMonthlyMemberSubscription,
} from "../../api";
import { useQuery } from "@tanstack/react-query";

export const useFetchMonthlyPaymentPlansData = () => {
  return useQuery({
    queryKey: ["monthly-subscription-plans"],
    queryFn: fetchMonthlyPaymentPlans,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchMonthlyMemberSubscriptionsData = (memberId: string, ordering: string) => {
  return useQuery({
    queryKey: ["member-monthly-subscription", memberId, ordering],
    queryFn: () => fetchMonthlyMemberSubscriptions(memberId, ordering),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
};

export const useFetchSingleMonthlyMemberSubscriptionData = (
  paymentId: string
) => {
  return useQuery({
    queryKey: ["member-single-monthly-subscription", paymentId],
    queryFn: () => fetchSingleMonthlyMemberSubscription(paymentId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!paymentId,
  });
};
