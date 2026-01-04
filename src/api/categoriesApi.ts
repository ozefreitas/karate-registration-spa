import { authClient } from "./apiClient";

export const fetchCategories = (
  page?: number,
  pageSize?: number,
  ordering?: string,
  gender?: string,
  minAge?: boolean,
  maxAge?: boolean,
  minGrad?: boolean,
  maxGrad?: boolean,
  minWeight?: boolean,
  maxWeight?: boolean
) => {
  const params: any = {
    ordering: ordering,
    gender: gender,
    has_min_age: minAge,
    has_max_age: maxAge,
    has_min_grad: minGrad,
    has_max_grad: maxGrad,
    has_min_weight: minWeight,
    has_max_weight: maxWeight,
  };
  if (page !== undefined && pageSize !== undefined) {
    params.page = page;
    params.page_size = pageSize;
  }
  return authClient.get("/categories/", { params });
};

export const fetchSingleCategory = (categoryId: string) => {
  return authClient.get(`/categories/${categoryId}/`);
};

export const createCategory = (data: any) => {
  return authClient.post("/categories/", data);
};

export const deleteCategory = (categoryId: string) => {
  return authClient.delete(`/categories/${categoryId}/`);
};

export const deleteAllCategories = () => {
  return authClient.delete("/categories/delete_all/");
};
