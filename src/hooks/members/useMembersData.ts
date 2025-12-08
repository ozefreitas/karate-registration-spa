import { useQuery } from "@tanstack/react-query";
import {
  fetchMembers,
  fetchSingleMember,
  fetchMembersNotInEvent,
  fetchCoachesNotInEvent,
  fetchMembersInCategoryGender,
  fetchDisciplineMemberNotIn,
  fetchLastFiveMembers,
} from "../../api";

export const useFetchMembersData = (page: number, pageSize: number, ordering?: string, memberType?: string, gender?: string) => {
  return useQuery({
    queryKey: ["members", page, pageSize, ordering, memberType, gender],
    queryFn: () => fetchMembers(page, pageSize, ordering, memberType, gender),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
};

export const useFetchSingleMemberData = (memberId: any) => {
  return useQuery({
    queryKey: ["single-member", memberId],
    queryFn: () => fetchSingleMember(memberId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!memberId,
  });
};

export const useFetchLastFiveMembers = () => {
  return useQuery({
    queryKey: ["lastfive-members"],
    queryFn: fetchLastFiveMembers,
    refetchOnWindowFocus: false,
  });
};

export const useFetchMembersNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number,
) => {
  return useQuery({
    queryKey: ["members-notin-event", eventId, page, pageSize],
    queryFn: () => fetchMembersNotInEvent(eventId, page, pageSize),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!eventId,
  });
};

export const useFetchCoachesNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number,
) => {
  return useQuery({
    queryKey: ["coaches-notin-event", eventId, page, pageSize],
    queryFn: () => fetchCoachesNotInEvent(eventId, page, pageSize),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!eventId,
  });
};

export const useFetchMembersInCategoryGender = (
  category: string,
  gender: string
) => {
  return useQuery({
    queryKey: ["members-in-category-gender", category, gender],
    queryFn: () => fetchMembersInCategoryGender(category, gender),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchDisciplinesnotInMemberData = (
  memberId: string,
  eventId: string
) => {
  return useQuery({
    queryKey: ["disciplines-not-in-member", memberId, eventId],
    queryFn: () => fetchDisciplineMemberNotIn(memberId, eventId),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    enabled: memberId !== "",
  });
};
