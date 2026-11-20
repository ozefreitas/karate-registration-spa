/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenObtainPair } from '../models/TokenObtainPair';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { AccessToken } from '../models/AccessToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Authenticates credentials and returns an access token. The refresh token is
     * sent as an HttpOnly cookie.
     * @param requestBody
     * @returns AccessToken
     * @throws ApiError
     */
    public static authTokenCreate(
        requestBody: TokenObtainPair,
    ): CancelablePromise<AccessToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Rotates the HttpOnly refresh cookie and returns a new access token.
     * @param requestBody
     * @returns AccessToken
     * @throws ApiError
     */
    public static authTokenRefreshCreate(
        requestBody: TokenRefresh,
    ): CancelablePromise<AccessToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
