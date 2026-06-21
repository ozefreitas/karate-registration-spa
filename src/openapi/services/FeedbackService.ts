/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFeedback } from '../models/CreateFeedback';
import type { Feedback } from '../models/Feedback';
import type { PatchedFeedback } from '../models/PatchedFeedback';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FeedbackService {
    /**
     * @returns Feedback
     * @throws ApiError
     */
    public static feedbackList(): CancelablePromise<Array<Feedback>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/feedback/',
        });
    }
    /**
     * @param requestBody
     * @returns CreateFeedback
     * @throws ApiError
     */
    public static feedbackCreate(
        requestBody: CreateFeedback,
    ): CancelablePromise<CreateFeedback> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/feedback/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this feedback data.
     * @returns Feedback
     * @throws ApiError
     */
    public static feedbackRetrieve(
        id: number,
    ): CancelablePromise<Feedback> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/feedback/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this feedback data.
     * @param requestBody
     * @returns Feedback
     * @throws ApiError
     */
    public static feedbackUpdate(
        id: number,
        requestBody: Feedback,
    ): CancelablePromise<Feedback> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/feedback/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this feedback data.
     * @param requestBody
     * @returns Feedback
     * @throws ApiError
     */
    public static feedbackPartialUpdate(
        id: number,
        requestBody?: PatchedFeedback,
    ): CancelablePromise<Feedback> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/feedback/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this feedback data.
     * @returns void
     * @throws ApiError
     */
    public static feedbackDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/feedback/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
