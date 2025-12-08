import { authClient } from "./apiClient";

export const fetchMonthlyMemberSubscriptions = (memberId: string) => {
  return authClient.get("/monthly_payments/", {
    params: {
      member: memberId,
    },
  });
};

export const patchMonthlyMemberSubscription = (
  monthlySubscriptionId: string,
  data: any
) => {
  return authClient.patch(`/monthly_payments/${monthlySubscriptionId}/`, data);
};
