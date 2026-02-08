/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category';
import type { CompactCategory } from '../models/CompactCategory';
import type { CreateCategory } from '../models/CreateCategory';
import type { PaginatedCategoryList } from '../models/PaginatedCategoryList';
import type { PatchedCategory } from '../models/PatchedCategory';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * @param gender
     * @param hasMaxAge
     * @param hasMaxGrad
     * @param hasMaxWeight
     * @param hasMinAge
     * @param hasMinGrad
     * @param hasMinWeight
     * @param notInDiscipline
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedCategoryList
     * @throws ApiError
     */
    public static categoriesList(
        gender?: string,
        hasMaxAge?: boolean,
        hasMaxGrad?: boolean,
        hasMaxWeight?: boolean,
        hasMinAge?: boolean,
        hasMinGrad?: boolean,
        hasMinWeight?: boolean,
        notInDiscipline?: string,
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedCategoryList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/',
            query: {
                'gender': gender,
                'has_max_age': hasMaxAge,
                'has_max_grad': hasMaxGrad,
                'has_max_weight': hasMaxWeight,
                'has_min_age': hasMinAge,
                'has_min_grad': hasMinGrad,
                'has_min_weight': hasMinWeight,
                'not_in_discipline': notInDiscipline,
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateCategory
     * @throws ApiError
     */
    public static categoriesCreate(
        requestBody: CreateCategory,
    ): CancelablePromise<CreateCategory> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/categories/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @returns CompactCategory
     * @throws ApiError
     */
    public static categoriesRetrieve(
        id: number,
    ): CancelablePromise<CompactCategory> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    public static categoriesUpdate(
        id: number,
        requestBody: Category,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @param requestBody
     * @returns Category
     * @throws ApiError
     */
    public static categoriesPartialUpdate(
        id: number,
        requestBody?: PatchedCategory,
    ): CancelablePromise<Category> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this category.
     * @returns void
     * @throws ApiError
     */
    public static categoriesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static categoriesDeleteAllDestroy(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/categories/delete_all/',
        });
    }
}
