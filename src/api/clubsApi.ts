import { apiClient, authClient } from "./apiClient";

export const fetchAvailableClubs = () => {
  return apiClient.get("/clubs/");
};

export const createClub = (data: any) => {
  return authClient.post("/clubs/", data);
};

export const deleteClub = (clubId: string) => {
  return authClient.delete(`/clubs/${clubId}/`);
};

export const fetchClubSubscriptions = (search: string) => {
  return authClient.get("/club_subscription/", { params: { search: search } });
};

export const fetchAvailableYears = () => {
  return authClient.get("/club_subscription/get_available_quote_years/");
};

export const patchClubSubscription = (clubId: string, data: any) => {
  return authClient.patch(`/club_subscription/${clubId}/`, data);
};

export const createAllClubsSubscription = (data: any) => {
  return authClient.post("/club_subscription/create_all_users/", data);
};

export const patchClubSubscriptionAmountConfig = (data: any) => {
  return authClient.patch("/club_subscription/update_subscription_amount/", data);
};

export const patchClubSubscriptionAmountbyYear = (data: any) => {
  return authClient.patch("/club_subscription/update_all_users_amount/", data);
};

export const patchClubSubscriptionDueDatebyYear = (data: any) => {
  return authClient.patch("/club_subscription/update_all_users_due_date/", data);
};
