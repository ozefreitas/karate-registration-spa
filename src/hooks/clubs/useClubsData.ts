import { useQuery } from "@tanstack/react-query";
import {
  ClubSettingsService,
  ClubsService,
  ClubSubscriptionConfigService,
  ClubSubscriptionService,
} from "../../openapi";

export const useFetchAvailableClubs = () => {
  return useQuery({
    queryKey: ["available-clubs"],
    queryFn: () => ClubsService.clubsList(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchClubSubscriptions = (
  search: string,
  userRole?: string,
) => {
  return useQuery({
    queryKey: ["club-subscriptions", search],
    queryFn: () => ClubSubscriptionService.clubSubscriptionList(search),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!search && ["main_admin", "superuser"].includes(userRole!),
  });
};

export const useFetchAvailableYears = () => {
  return useQuery({
    queryKey: ["subscriptions-available-years"],
    queryFn:
      ClubSubscriptionService.clubSubscriptionGetAvailableQuoteYearsRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchClubSettingsData = () => {
  return useQuery({
    queryKey: ["club-setting"],
    queryFn: ClubSettingsService.clubSettingsList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchClubSubscriptionConfig = () => {
  return useQuery({
    queryKey: ["club-subscription-config"],
    queryFn: () => ClubSubscriptionConfigService.clubSubscriptionConfigMeRetrieve(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
