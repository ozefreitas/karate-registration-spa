/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { MonthlyPersonPaymentConfig } from '../models/MonthlyPersonPaymentConfig';
import type { PaginatedMonthlyPersonPaymentConfigList } from '../models/PaginatedMonthlyPersonPaymentConfigList';
import type { PatchedMonthlyPersonPaymentConfig } from '../models/PatchedMonthlyPersonPaymentConfig';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MonthlyMemberPaymentConfigsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMonthlyPersonPaymentConfigList
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMonthlyPersonPaymentConfigList> {
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
     * @returns MonthlyPersonPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsCreate(
        requestBody: MonthlyPersonPaymentConfig,
    ): CancelablePromise<MonthlyPersonPaymentConfig> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/monthly_member_payment_configs/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment config.
     * @returns MonthlyPersonPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsRetrieve(
        id: number,
    ): CancelablePromise<MonthlyPersonPaymentConfig> {
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
     * @returns MonthlyPersonPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsUpdate(
        id: number,
        requestBody: MonthlyPersonPaymentConfig,
    ): CancelablePromise<MonthlyPersonPaymentConfig> {
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
     * @returns MonthlyPersonPaymentConfig
     * @throws ApiError
     */
    public static monthlyMemberPaymentConfigsPartialUpdate(
        id: number,
        requestBody?: PatchedMonthlyPersonPaymentConfig,
    ): CancelablePromise<MonthlyPersonPaymentConfig> {
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
