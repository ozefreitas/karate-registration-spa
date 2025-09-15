import { useQuery } from "@tanstack/react-query";
import {
  fetchMembers,
  fetchSingleMember,
  fetchMembersNotInEvent,
  fetchMembersInCategoryGender,
  fetchDisciplineMemberNotIn,
  fetchLastFiveMembers,
} from "../../api";

export const useFetchMembersData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["athletes", page, pageSize],
    queryFn: () => fetchMembers(page, pageSize),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
  });
};

export const useFetchSingleMemberData = (memberId: any) => {
  return useQuery({
    queryKey: ["single-athlete", memberId],
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
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
};

export const useFetchAthletesNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["athletes-notin-event", page, pageSize],
    queryFn: () => fetchMembersNotInEvent(eventId, page, pageSize),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!eventId,
  });
};

export const useFetchAthletesInCategoryGender = (
  category: string,
  gender: string
) => {
  return useQuery({
    queryKey: ["athletes-in-category-gender", category, gender],
    queryFn: () => fetchMembersInCategoryGender(category, gender),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useFetchDisciplinesnotInAthleteData = (
  memberId: string,
  eventId: string
) => {
  return useQuery({
    queryKey: ["disciplines-not-in-athlete", memberId, eventId],
    queryFn: () => fetchDisciplineMemberNotIn(memberId, eventId),
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    enabled: memberId !== "",
  });
};
