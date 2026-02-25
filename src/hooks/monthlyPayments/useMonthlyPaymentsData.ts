import { useQuery } from "@tanstack/react-query";
import {
  MonthlyPaymentPlansService,
  MonthlyPaymentsService,
} from "../../openapi";

export const useFetchMonthlyPaymentPlansData = () => {
  return useQuery({
    queryKey: ["monthly-subscription-plans"],
    queryFn: MonthlyPaymentPlansService.monthlyPaymentPlansList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetcSingleMonthlyMemberSubscriptionsData = (planId: string) => {
  return useQuery({
    queryKey: ["single-monthly-subscription-plans", planId],
    queryFn: () =>
      MonthlyPaymentPlansService.monthlyPaymentPlansRetrieve(Number(planId)),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: planId !== "",
  });
};

export const useFetchMonthlyMemberSubscriptionsData = (
  ordering: string,
  memberId?: string,
) => {
  return useQuery({
    queryKey: ["member-monthly-subscription", memberId, ordering],
    queryFn: () =>
      MonthlyPaymentsService.monthlyPaymentsList(ordering, memberId),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
};

export const useFetchSingleMonthlyMemberSubscriptionData = (
  paymentId: string,
) => {
  return useQuery({
    queryKey: ["member-single-monthly-subscription", paymentId],
    queryFn: () =>
      MonthlyPaymentsService.monthlyPaymentsRetrieve(Number(paymentId)),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!paymentId,
  });
};
