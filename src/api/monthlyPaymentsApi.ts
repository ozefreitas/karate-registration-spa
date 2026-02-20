import { authClient } from "./apiClient";

// monthly payment plans

export const fetchMonthlyPaymentPlans = () => {
  return authClient.get("/monthly_payment_plans/");
};

export const fetchSingleMonthlyPaymentPlanData = (planId: string) => {
  return authClient.get(`/monthly_payment_plans/${planId}/`);
};

export const createMonthlyPaymentPlan = (data: any) => {
  return authClient.post("/monthly_payment_plans/", data);
};

export const patchMonthlyPaymentPlanData = (planId: string, data: any) => {
  return authClient.patch(`/monthly_payment_plans/${planId}/`, data);
};

export const deleteMonthlyPaymentPlan = (planId: string) => {
  return authClient.delete(`/monthly_payment_plans/${planId}/`);
};

// subscriptions details

export const fetchMonthlyMemberSubscriptions = (
  ordering: string,
  memberId?: string
) => {
  return authClient.get("/monthly_payments/", {
    params: {
      person: memberId,
      ordering: ordering,
    },
  });
};

export const fetchSingleMonthlyMemberSubscription = (paymentId: string) => {
  return authClient.get(`/monthly_payments/${paymentId}/`);
};

export const createMonthlyMemberSubscription = (data: any) => {
  return authClient.post("/monthly_payments/", data);
};

export const patchMonthlyMemberSubscription = (
  monthlySubscriptionId: string,
  data: any
) => {
  return authClient.patch(`/monthly_payments/${monthlySubscriptionId}/`, data);
};

export const deleteMonthlyMemberSubscription = (paymentId: string) => {
  return authClient.delete(`/monthly_payments/${paymentId}/`);
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
