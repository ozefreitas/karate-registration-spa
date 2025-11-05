import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchSingleCategory } from "../../api";

export const useFetchCategoriesData = (page?: number, pageSize?: number) => {
  return useQuery({
    queryKey: ["categories", page, pageSize],
    queryFn: () => fetchCategories(page, pageSize),
    refetchOnWindowFocus: false,
  });
};

export const useFetchSingleCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["single-category", categoryId],
    queryFn: () => fetchSingleCategory(categoryId),
    refetchOnWindowFocus: false,
    enabled: categoryId !== "",
  });
};
