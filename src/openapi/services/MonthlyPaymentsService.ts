/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { CreateMonthlyPersonPayment } from '../models/CreateMonthlyPersonPayment';
import type { MonthlyPersonPayment } from '../models/MonthlyPersonPayment';
import type { PatchedPatchMonthlyPersonPayment } from '../models/PatchedPatchMonthlyPersonPayment';
import type { PatchMonthlyPersonPayment } from '../models/PatchMonthlyPersonPayment';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MonthlyPaymentsService {
    /**
     * @param ordering Which field to use when ordering the results.
     * @param person
     * @returns MonthlyPersonPayment
     * @throws ApiError
     */
    public static monthlyPaymentsList(
        ordering?: string,
        person?: string,
    ): CancelablePromise<Array<MonthlyPersonPayment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_payments/',
            query: {
                'ordering': ordering,
                'person': person,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateMonthlyPersonPayment
     * @throws ApiError
     */
    public static monthlyPaymentsCreate(
        requestBody: CreateMonthlyPersonPayment,
    ): CancelablePromise<CreateMonthlyPersonPayment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/monthly_payments/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment.
     * @returns MonthlyPersonPayment
     * @throws ApiError
     */
    public static monthlyPaymentsRetrieve(
        id: number,
    ): CancelablePromise<MonthlyPersonPayment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_payments/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment.
     * @param requestBody
     * @returns MonthlyPersonPayment
     * @throws ApiError
     */
    public static monthlyPaymentsUpdate(
        id: number,
        requestBody: MonthlyPersonPayment,
    ): CancelablePromise<MonthlyPersonPayment> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/monthly_payments/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment.
     * @param requestBody
     * @returns PatchMonthlyPersonPayment
     * @throws ApiError
     */
    public static monthlyPaymentsPartialUpdate(
        id: number,
        requestBody?: PatchedPatchMonthlyPersonPayment,
    ): CancelablePromise<PatchMonthlyPersonPayment> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/monthly_payments/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly person payment.
     * @returns void
     * @throws ApiError
     */
    public static monthlyPaymentsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/monthly_payments/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
