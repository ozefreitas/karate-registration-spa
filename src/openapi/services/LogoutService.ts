/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LogoutResponse } from '../models/LogoutResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LogoutService {
    /**
     * Logs out the authenticated user by deleting their auth token.
     * @returns LogoutResponse
     * @throws ApiError
     */
    public static logoutCreate(): CancelablePromise<LogoutResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/logout/',
        });
    }
}
