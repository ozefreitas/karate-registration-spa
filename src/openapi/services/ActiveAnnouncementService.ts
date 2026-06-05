/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Announcement } from '../models/Announcement';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActiveAnnouncementService {
    /**
     * @returns Announcement
     * @throws ApiError
     */
    public static activeAnnouncementList(): CancelablePromise<Array<Announcement>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/active_announcement/',
        });
    }
}
