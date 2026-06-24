/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Notifications } from '../models/Notifications';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClubNotificationsService {
    /**
     * @returns Notifications
     * @throws ApiError
     */
    public static clubNotificationsRetrieve(): CancelablePromise<Notifications> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_notifications/',
        });
    }
}
