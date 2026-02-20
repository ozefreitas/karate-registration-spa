/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MonthlyMemberPaymentConfig } from '../models/MonthlyMemberPaymentConfig';
import type { PaginatedMonthlyMemberPaymentConfigList } from '../models/PaginatedMonthlyMemberPaymentConfigList';
import type { PatchedMonthlyMemberPaymentConfig } from '../models/PatchedMonthlyMemberPaymentConfig';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MonthlyMemberPaymentConfigsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMonthlyMemberPaymentConfigList
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMonthlyMemberPaymentConfigList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_member_payment_configs/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns MonthlyMemberPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsCreate(
        requestBody: MonthlyMemberPaymentConfig,
    ): CancelablePromise<MonthlyMemberPaymentConfig> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/monthly_member_payment_configs/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment config.
     * @returns MonthlyMemberPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsRetrieve(
        id: number,
    ): CancelablePromise<MonthlyMemberPaymentConfig> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_member_payment_configs/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment config.
     * @param requestBody
     * @returns MonthlyMemberPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsUpdate(
        id: number,
        requestBody: MonthlyMemberPaymentConfig,
    ): CancelablePromise<MonthlyMemberPaymentConfig> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/monthly_member_payment_configs/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment config.
     * @param requestBody
     * @returns MonthlyMemberPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsPartialUpdate(
        id: number,
        requestBody?: PatchedMonthlyMemberPaymentConfig,
    ): CancelablePromise<MonthlyMemberPaymentConfig> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/monthly_member_payment_configs/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment config.
     * @returns void
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/monthly_member_payment_configs/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
