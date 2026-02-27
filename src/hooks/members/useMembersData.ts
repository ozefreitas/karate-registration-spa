import { useQuery } from "@tanstack/react-query";
import { MemberValidationService, PersonsService } from "../../openapi";

export const useFetchMembersData = (
  page: number,
  pageSize: number,
  ordering?: string,
  memberType?: string,
  gender?: string,
  quotesLegible?: boolean,
  monthlyPaymentStatus?: string,
  isValidated?: boolean,
  users?: string,
) => {
  return useQuery({
    queryKey: [
      "members",
      page,
      pageSize,
      ordering,
      memberType,
      gender,
      quotesLegible,
      monthlyPaymentStatus,
      isValidated,
      users,
    ],
    queryFn: () =>
      PersonsService.personsList(
        undefined,
        undefined,
        undefined,
        gender,
        memberType,
        users,
        quotesLegible,
        isValidated,
        monthlyPaymentStatus,
        undefined,
        ordering,
        page,
        pageSize,
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchSingleMemberData = (memberId: any) => {
  return useQuery({
    queryKey: ["single-member", memberId],
    queryFn: () => PersonsService.personsRetrieve(memberId),
    refetchOnWindowFocus: false,
    enabled: !!memberId,
  });
};

export const useFetchLastFiveMembers = () => {
  return useQuery({
    queryKey: ["last-five-members"],
    queryFn: () => PersonsService.personsLastFiveList(),
    refetchOnWindowFocus: false,
  });
};

export const useFetchMembersNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number,
  gender?: string,
  enabled?: boolean,
  disciplineId?: string,
) => {
  return useQuery({
    queryKey: [
      "members-notin-event",
      eventId,
      page,
      pageSize,
      gender,
      disciplineId,
    ],
    queryFn: () =>
      PersonsService.personsList(
        undefined,
        disciplineId,
        undefined,
        gender,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        eventId,
        undefined,
        page,
        pageSize,
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!eventId && !!enabled,
  });
};

export const useFetchCoachesNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number,
) => {
  return useQuery({
    queryKey: ["coaches-notin-event", eventId, page, pageSize],
    queryFn: () =>
      PersonsService.personsList(
        eventId,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        page,
        pageSize,
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!eventId,
  });
};

export const useFetchMembersInCategoryGender = (
  category: string,
  gender: string,
) => {
  return useQuery({
    queryKey: ["members-in-category-gender", category, gender],
    queryFn: () =>
      PersonsService.personsList(undefined, undefined, category, gender),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: false,
  });
};

export const useFetchDisciplinesnotInMemberData = (
  memberId: string,
  eventId: string,
) => {
  return useQuery({
    queryKey: ["disciplines-not-in-member", memberId, eventId],
    queryFn: () =>
      PersonsService.personsUnregisteredModalitiesRetrieve(eventId, memberId),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    enabled: memberId !== "",
  });
};

export const useFetchMemberValidationRequestsData = (userRole?: string) => {
  return useQuery({
    queryKey: ["members-validation"],
    queryFn: () => MemberValidationService.memberValidationList(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: ["main_admin", "superuser"].includes(userRole!),
  });
};

export const useFetchMemberPaymentsStatusData = () => {
  return useQuery({
    queryKey: ["members-payment-status"],
    queryFn: PersonsService.personsMembersPaymentsStatusRetrieve,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
