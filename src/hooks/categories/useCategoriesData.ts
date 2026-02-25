import { useQuery } from "@tanstack/react-query";
import { CategoriesService } from "../../openapi";

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
  maxWeight?: boolean,
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
      CategoriesService.categoriesList(
        gender,
        maxAge,
        maxGrad,
        maxWeight,
        minAge,
        minGrad,
        minWeight,
        undefined,
        ordering,
        page,
        pageSize,
      ),
    refetchOnWindowFocus: false,
  });
};

export const useFetchSingleCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["single-category", categoryId],
    queryFn: () => CategoriesService.categoriesRetrieve(Number(categoryId)),
    refetchOnWindowFocus: false,
    enabled: categoryId !== "" && categoryId !== undefined,
  });
};

export const useFetchCategoryNotinDiscipline = (disciplineId: string) => {
  return useQuery({
    queryKey: ["category-not-in-discipline", disciplineId],
    queryFn: () =>
      CategoriesService.categoriesList(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        disciplineId,
      ),
    refetchOnWindowFocus: false,
    enabled: disciplineId !== "" && disciplineId !== undefined,
  });
};
