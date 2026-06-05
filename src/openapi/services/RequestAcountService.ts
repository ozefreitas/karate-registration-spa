/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedRequestedAcountList } from '../models/PaginatedRequestedAcountList';
import type { PatchedRequestedAcount } from '../models/PatchedRequestedAcount';
import type { RequestedAcount } from '../models/RequestedAcount';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RequestAcountService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedRequestedAcountList
     * @throws ApiError
     */
    public static requestAcountList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedRequestedAcountList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/request_acount/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns RequestedAcount
     * @throws ApiError
     */
    public static requestAcountCreate(
        requestBody: RequestedAcount,
    ): CancelablePromise<RequestedAcount> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/request_acount/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this requested acount.
     * @returns RequestedAcount
     * @throws ApiError
     */
    public static requestAcountRetrieve(
        id: number,
    ): CancelablePromise<RequestedAcount> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/request_acount/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this requested acount.
     * @param requestBody
     * @returns RequestedAcount
     * @throws ApiError
     */
    public static requestAcountUpdate(
        id: number,
        requestBody: RequestedAcount,
    ): CancelablePromise<RequestedAcount> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/request_acount/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this requested acount.
     * @param requestBody
     * @returns RequestedAcount
     * @throws ApiError
     */
    public static requestAcountPartialUpdate(
        id: number,
        requestBody?: PatchedRequestedAcount,
    ): CancelablePromise<RequestedAcount> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/request_acount/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this requested acount.
     * @returns void
     * @throws ApiError
     */
    public static requestAcountDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/request_acount/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
