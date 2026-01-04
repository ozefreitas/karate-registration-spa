import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchSingleCategory } from "../../api";

export const useFetchCategoriesData = (
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
  return useQuery({
    queryKey: [
      "categories",
      page,
      pageSize,
      ordering,
      gender,
      minAge,
      maxAge,
      minGrad,
      maxGrad,
      minWeight,
      maxWeight,
    ],
    queryFn: () =>
      fetchCategories(
        page,
        pageSize,
        ordering,
        gender,
        minAge,
        maxAge,
        minGrad,
        maxGrad,
        minWeight,
        maxWeight
      ),
    refetchOnWindowFocus: false,
  });
};

export const useFetchSingleCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["single-category", categoryId],
    queryFn: () => fetchSingleCategory(categoryId),
    refetchOnWindowFocus: false,
    enabled: categoryId !== "" && categoryId !== undefined,
  });
};
