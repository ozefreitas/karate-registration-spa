/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationsResponse } from '../models/NotificationsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClubNotificationsService {
    /**
     * @returns NotificationsResponse
     * @throws ApiError
     */
    public static clubNotificationsRetrieve(): CancelablePromise<NotificationsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_notifications/',
        });
    }
}
