/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JWTAccess } from '../models/JWTAccess';
import type { JWTLogin } from '../models/JWTLogin';
import type { JWTRefresh } from '../models/JWTRefresh';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     * @param requestBody
     * @returns JWTAccess
     * @throws ApiError
     */
    public static authTokenCreate(
        requestBody: JWTLogin,
    ): CancelablePromise<JWTAccess> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     * @param requestBody
     * @returns JWTAccess
     * @throws ApiError
     */
    public static authTokenRefreshCreate(
        requestBody?: JWTRefresh,
    ): CancelablePromise<JWTAccess> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
