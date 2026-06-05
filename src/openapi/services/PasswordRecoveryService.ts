/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { Password } from '../models/Password';
import type { RequestPasswordReset } from '../models/RequestPasswordReset';
import type { Username } from '../models/Username';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PasswordRecoveryService {
    /**
     * View that confirms the uidb64 and token from the requesting user, and checks if a password is provided in the payload.
     * @param token
     * @param uidb64
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static passwordRecoveryConfirmCreate(
        token: string,
        uidb64: string,
        requestBody: Password,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/password_recovery/confirm/{uidb64}/{token}/',
            path: {
                'token': token,
                'uidb64': uidb64,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `No response body`,
            },
        });
    }
    /**
     * Generate a unique url for password recovery by providing the id of the account.
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static passwordRecoveryGenerateUrlCreate(
        requestBody: Username,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/password_recovery/generate_url/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `No response body`,
            },
        });
    }
    /**
     * Returns all the current requests for password resets.
     * @returns any No response body
     * @throws ApiError
     */
    public static passwordRecoveryListRequestsRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/password_recovery/list_requests/',
            errors: {
                400: `No response body`,
            },
        });
    }
    /**
     * Creates a new request for a password recovery.
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static passwordRecoveryRequestCreate(
        requestBody: RequestPasswordReset,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/password_recovery/request/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
