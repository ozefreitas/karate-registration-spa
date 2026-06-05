/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { AuthLogin } from '../models/AuthLogin';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LoginService {
    /**
     * @param formData
     * @returns AuthLogin
     * @throws ApiError
     */
    public static loginCreate(
        formData: AuthLogin,
    ): CancelablePromise<AuthLogin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login/',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }
}
