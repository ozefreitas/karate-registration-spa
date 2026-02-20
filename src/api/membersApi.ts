import { authClient } from "./apiClient";

export const fetchMembers = (
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
  return authClient.get("/persons/", {
    params: {
      page: page,
      page_size: pageSize,
      ordering: ordering,
      in_member_type: memberType,
      in_gender: gender,
      is_quotes_legible: quotesLegible,
      monthly_payment_status: monthlyPaymentStatus,
      is_validated: isValidated,
      in_user: users,
    },
  });
};

export const fetchSingleMember = (memberId: string) => {
  return authClient.get(`/persons/${memberId}/`);
};

export const fetchLastFiveMembers = () => {
  return authClient.get("/persons/last_five/");
};

export const fetchMembersNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number,
  gender?: string,
  teams?: boolean,
  disciplineId?: string,
) => {
  return authClient.get("/persons/", {
    params: {
      not_in_event: eventId,
      page: page,
      page_size: pageSize,
      in_gender: gender,
      teams: teams,
      discipline_id: disciplineId,
    },
  });
};

export const fetchCoachesNotInEvent = (
  eventId: string,
  page: number,
  pageSize: number,
) => {
  return authClient.get("/persons/", {
    params: { coach_not_in_event: eventId, page: page, page_size: pageSize },
  });
};

export const fetchMembersInCategoryGender = (
  category: string,
  gender: string,
) => {
  return authClient.get("/persons/", {
    params: { in_category: category, in_gender: gender },
  });
};

export const createMember = (data: any) => {
  return authClient.post("/persons/", data);
};

export const updateMember = (memberId: string, data: any) => {
  return authClient.put(`/persons/${memberId}/`, data);
};

export const patchMember = (personId: string, data: any) => {
  return authClient.patch(`/persons/${personId}/`, data);
};

export const deleteMember = (memberId: string) => {
  return authClient.delete(`/persons/${memberId}/`);
};

export const deleteAllMembers = () => {
  return authClient.delete(`/persons/delete_all/`);
};

export const fetchDisciplineMemberNotIn = (
  memberId: string,
  eventId: string,
) => {
  return authClient.get(
    `/persons/${memberId}/unregistered_modalities/${eventId}/`,
  );
};

// request member validation

export const createMemberValidationRequest = (data: any) => {
  return authClient.post("/member_validation/", data);
};
