/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMonthlyMemberPayment } from '../models/CreateMonthlyMemberPayment';
import type { MonthlyMemberPayment } from '../models/MonthlyMemberPayment';
import type { PatchedPatchMonthlyMemberPayment } from '../models/PatchedPatchMonthlyMemberPayment';
import type { PatchMonthlyMemberPayment } from '../models/PatchMonthlyMemberPayment';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MonthlyPaymentsService {
    /**
     * @param member
     * @param ordering Which field to use when ordering the results.
     * @returns MonthlyMemberPayment
     * @throws ApiError
     */
    public static monthlyPaymentsList(
        member?: string,
        ordering?: string,
    ): CancelablePromise<Array<MonthlyMemberPayment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_payments/',
            query: {
                'member': member,
                'ordering': ordering,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateMonthlyMemberPayment
     * @throws ApiError
     */
    public static monthlyPaymentsCreate(
        requestBody: CreateMonthlyMemberPayment,
    ): CancelablePromise<CreateMonthlyMemberPayment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/monthly_payments/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly member payment.
     * @returns MonthlyMemberPayment
     * @throws ApiError
     */
    public static monthlyPaymentsRetrieve(
        id: number,
    ): CancelablePromise<MonthlyMemberPayment> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_payments/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this monthly member payment.
     * @param requestBody
     * @returns MonthlyMemberPayment
     * @throws ApiError
     */
    public static monthlyPaymentsUpdate(
        id: number,
        requestBody: MonthlyMemberPayment,
    ): CancelablePromise<MonthlyMemberPayment> {
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
     * @param id A unique integer value identifying this monthly member payment.
     * @param requestBody
     * @returns PatchMonthlyMemberPayment
     * @throws ApiError
     */
    public static monthlyPaymentsPartialUpdate(
        id: number,
        requestBody?: PatchedPatchMonthlyMemberPayment,
    ): CancelablePromise<PatchMonthlyMemberPayment> {
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
     * @param id A unique integer value identifying this monthly member payment.
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
