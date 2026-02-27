/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllClassifications } from '../models/AllClassifications';
import type { CreateClassifications } from '../models/CreateClassifications';
import type { PaginatedAllClassificationsList } from '../models/PaginatedAllClassificationsList';
import type { PatchedAllClassifications } from '../models/PatchedAllClassifications';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClassificationsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedAllClassificationsList
     * @throws ApiError
     */
    public static classificationsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedAllClassificationsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/classifications/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateClassifications
     * @throws ApiError
     */
    public static classificationsCreate(
        requestBody: CreateClassifications,
    ): CancelablePromise<CreateClassifications> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/classifications/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this classification.
     * @returns AllClassifications
     * @throws ApiError
     */
    public static classificationsRetrieve(
        id: number,
    ): CancelablePromise<AllClassifications> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this classification.
     * @param requestBody
     * @returns AllClassifications
     * @throws ApiError
     */
    public static classificationsUpdate(
        id: number,
        requestBody: AllClassifications,
    ): CancelablePromise<AllClassifications> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this classification.
     * @param requestBody
     * @returns AllClassifications
     * @throws ApiError
     */
    public static classificationsPartialUpdate(
        id: number,
        requestBody?: PatchedAllClassifications,
    ): CancelablePromise<AllClassifications> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/classifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this classification.
     * @returns void
     * @throws ApiError
     */
    public static classificationsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/classifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns AllClassifications
     * @throws ApiError
     */
    public static classificationsLastCompQualiRetrieve(): CancelablePromise<AllClassifications> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/classifications/last_comp_quali/',
        });
    }
    /**
     * @returns AllClassifications
     * @throws ApiError
     */
    public static classificationsPerCompRetrieve(): CancelablePromise<AllClassifications> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/classifications/per_comp/',
        });
    }
}
