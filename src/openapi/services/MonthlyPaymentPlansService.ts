/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMonthlyPaymentPlan } from '../models/CreateMonthlyPaymentPlan';
import type { MonthlyPaymentPlan } from '../models/MonthlyPaymentPlan';
import type { PatchedMonthlyPaymentPlan } from '../models/PatchedMonthlyPaymentPlan';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MonthlyPaymentPlansService {
    /**
     * @returns MonthlyPaymentPlan
     * @throws ApiError
     */
    public static monthlyPaymentPlansList(): CancelablePromise<Array<MonthlyPaymentPlan>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_payment_plans/',
        });
    }
    /**
     * @param requestBody
     * @returns CreateMonthlyPaymentPlan
     * @throws ApiError
     */
    public static monthlyPaymentPlansCreate(
        requestBody: CreateMonthlyPaymentPlan,
    ): CancelablePromise<CreateMonthlyPaymentPlan> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/monthly_payment_plans/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly payment plan.
     * @returns MonthlyPaymentPlan
     * @throws ApiError
     */
    public static monthlyPaymentPlansRetrieve(
        id: number,
    ): CancelablePromise<MonthlyPaymentPlan> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/monthly_payment_plans/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this monthly payment plan.
     * @param requestBody
     * @returns MonthlyPaymentPlan
     * @throws ApiError
     */
    public static monthlyPaymentPlansUpdate(
        id: number,
        requestBody: MonthlyPaymentPlan,
    ): CancelablePromise<MonthlyPaymentPlan> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/monthly_payment_plans/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly payment plan.
     * @param requestBody
     * @returns MonthlyPaymentPlan
     * @throws ApiError
     */
    public static monthlyPaymentPlansPartialUpdate(
        id: number,
        requestBody?: PatchedMonthlyPaymentPlan,
    ): CancelablePromise<MonthlyPaymentPlan> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/monthly_payment_plans/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this monthly payment plan.
     * @returns void
     * @throws ApiError
     */
    public static monthlyPaymentPlansDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/monthly_payment_plans/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
