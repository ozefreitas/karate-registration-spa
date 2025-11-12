import { authClient } from "./apiClient";

export const fetchMembers = (page: number, pageSize: number) => {
  return authClient.get("/athletes/", {
    params: { page: page, page_size: pageSize },
  });
};

export const fetchSingleMember = (memberId: string) => {
  return authClient.get(`/athletes/${memberId}/`);
};

export const fetchLastFiveMembers = () => {
  return authClient.get("/athletes/last_five/");
};

export const fetchMembersNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number
) => {
  return authClient.get("/athletes/", {
    params: { not_in_event: eventId, page: page, page_size: pageSize },
  });
};

export const fetchCoachesNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number
) => {
  return authClient.get("/athletes/", {
    params: { coach_not_in_event: eventId, page: page, page_size: pageSize },
  });
};



export const fetchMembersInCategoryGender = (
  category: string,
  gender: string
) => {
  return authClient.get("/athletes/", {
    params: { in_category: category, in_gender: gender },
  });
};

export const createMember = (data: any) => {
  return authClient.post("/athletes/", data);
};

export const updateMember = (memberId: string, data: any) => {
  return authClient.put(`/athletes/${memberId}/`, data);
};

export const patchMember = (memberId: string, data: any) => {
  return authClient.patch(`/athletes/${memberId}/`, data);
};

export const deleteMember = (memberId: string) => {
  return authClient.delete(`/athletes/${memberId}/`);
};

export const deleteAllMembers = () => {
  return authClient.delete(`/athletes/delete_all/`);
};

export const fetchDisciplineMemberNotIn = (
  memberId: string,
  eventId: string
) => {
  return authClient.get(
    `/athletes/${memberId}/unregistered_modalities/${eventId}/`
  );
};
