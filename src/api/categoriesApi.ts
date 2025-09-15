import { authClient } from "./apiClient";

export const fetchCategories = (page?: number, pageSize?: number) => {
  const params: any = {};
  if (page !== undefined && pageSize !== undefined) {
    params.page = page;
    params.page_size = pageSize;
  }
  return authClient.get("/categories/", { params });
};

export const fetchSingleCategory = (categoryId: string) => {
  return authClient.get(`/categories/${categoryId}`);
};

export const createCategory = (data: any) => {
  return authClient.post("/categories/", data);
};

export const deleteCategory = (categoryId: string) => {
  return authClient.delete(`/categories/${categoryId}`);
};

export const deleteAllCategories = () => {
  return authClient.delete("/categories/delete_all/");
};