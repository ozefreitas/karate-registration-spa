/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Classifications } from '../models/Classifications';
import type { CreateClassifications } from '../models/CreateClassifications';
import type { PaginatedClassificationsList } from '../models/PaginatedClassificationsList';
import type { PatchedClassifications } from '../models/PatchedClassifications';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClassificationsService {
    /**
     * @param bracket
     * @param event
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedClassificationsList
     * @throws ApiError
     */
    public static classificationsList(
        bracket?: string,
        event?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedClassificationsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/classifications/',
            query: {
                'bracket': bracket,
                'event': event,
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
     * @returns Classifications
     * @throws ApiError
     */
    public static classificationsRetrieve(
        id: number,
    ): CancelablePromise<Classifications> {
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
     * @returns Classifications
     * @throws ApiError
     */
    public static classificationsUpdate(
        id: number,
        requestBody: Classifications,
    ): CancelablePromise<Classifications> {
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
     * @returns Classifications
     * @throws ApiError
     */
    public static classificationsPartialUpdate(
        id: number,
        requestBody?: PatchedClassifications,
    ): CancelablePromise<Classifications> {
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
     * @returns Classifications
     * @throws ApiError
     */
    public static classificationsLastCompQualiRetrieve(): CancelablePromise<Classifications> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/classifications/last_comp_quali/',
        });
    }
}
