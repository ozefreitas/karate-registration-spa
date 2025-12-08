import { authClient } from "./apiClient";

export const fetchMembers = (
  page: number,
  pageSize: number,
  ordering?: string,
  memberType?: string,
  gender?: string
) => {
  return authClient.get("/members/", {
    params: {
      page: page,
      page_size: pageSize,
      ordering: ordering,
      in_member_type: memberType,
      in_gender: gender,
    },
  });
};

export const fetchSingleMember = (memberId: string) => {
  return authClient.get(`/members/${memberId}/`);
};

export const fetchLastFiveMembers = () => {
  return authClient.get("/members/last_five/");
};

export const fetchMembersNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number
) => {
  return authClient.get("/members/", {
    params: { not_in_event: eventId, page: page, page_size: pageSize },
  });
};

export const fetchCoachesNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number
) => {
  return authClient.get("/members/", {
    params: { coach_not_in_event: eventId, page: page, page_size: pageSize },
  });
};

export const fetchMembersInCategoryGender = (
  category: string,
  gender: string
) => {
  return authClient.get("/members/", {
    params: { in_category: category, in_gender: gender },
  });
};

export const createMember = (data: any) => {
  return authClient.post("/members/", data);
};

export const updateMember = (memberId: string, data: any) => {
  return authClient.put(`/members/${memberId}/`, data);
};

export const patchMember = (memberId: string, data: any) => {
  return authClient.patch(`/members/${memberId}/`, data);
};

export const deleteMember = (memberId: string) => {
  return authClient.delete(`/members/${memberId}/`);
};

export const deleteAllMembers = () => {
  return authClient.delete(`/members/delete_all/`);
};

export const fetchDisciplineMemberNotIn = (
  memberId: string,
  eventId: string
) => {
  return authClient.get(
    `/members/${memberId}/unregistered_modalities/${eventId}/`
  );
};