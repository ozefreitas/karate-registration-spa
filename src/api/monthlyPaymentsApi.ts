import { authClient } from "./apiClient";

// monthly payment plans

export const fetchMonthlyPaymentPlans = () => {
  return authClient.get("/monthly_payment_plans/");
};

// subscriptions details

export const fetchMonthlyMemberSubscriptions = (
  memberId: string,
  ordering: string
) => {
  return authClient.get("/monthly_payments/", {
    params: {
      member: memberId,
      ordering: ordering,
    },
  });
};

export const fetchSingleMonthlyMemberSubscription = (paymentId: string) => {
  return authClient.get(`/monthly_payments/${paymentId}/`);
};

export const patchMonthlyMemberSubscription = (
  monthlySubscriptionId: string,
  data: any
) => {
  return authClient.patch(`/monthly_payments/${monthlySubscriptionId}/`, data);
};

// member payment config

export const patchMemberMonthlyPaymentConfig = (
  monthlyPaymentConfigId: string,
  data: any
) => {
  return authClient.patch(
    `/monthly_member_payment_configs/${monthlyPaymentConfigId}/`,
    data
  );
};
