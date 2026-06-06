import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MemberValidationService, PersonsService } from "../../openapi";
import { PaginatedResponse } from "../types";

export interface NotInEventCoaches {
  id: string;
  gender: string;
  full_name: string;
  graduation: string;
}

interface Club {
  username: string;
}

interface Members {
  id: string;
  full_name: string;
  gender: string;
  club: Club;
  member_types: any;
  age: string;
  is_validated: boolean;
  request_status: string;
  past_month_payment_status: string;
  updated_by: Club;
}

interface MembersNotInEvent {
  id: string;
  full_name: string;
  gender: string;
  club: Club;
  member_types: any;
  age: string;
  is_validated: boolean;
  request_status: string;
  past_month_payment_status: string;
  updated_by: Club;
  graduation: string;
  weight: string;
  category: string;
  current_month_payment_status: string;
  exam_request_status: string;
}

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
): UseQueryResult<PaginatedResponse<Members>> => {
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
      ).then((res) => res as unknown as PaginatedResponse<Members>),
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
): UseQueryResult<PaginatedResponse<MembersNotInEvent>> => {
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
      ).then((res) => res as unknown as PaginatedResponse<MembersNotInEvent>),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!eventId && !!enabled,
  });
};

export const useFetchCoachesNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number,
): UseQueryResult<PaginatedResponse<NotInEventCoaches>> => {
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
      ).then((res) => res as unknown as PaginatedResponse<NotInEventCoaches>),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!eventId,
  });
};

export const useFetchMembersInCategoryGender = (
  category?: string,
  gender?: string,
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
      PersonsService.personsUnregisteredModalitiesList(eventId, memberId),
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
