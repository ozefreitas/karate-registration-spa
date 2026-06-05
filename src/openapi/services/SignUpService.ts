/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { GenerateToken } from '../models/GenerateToken';
import type { RegisterUser } from '../models/RegisterUser';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SignUpService {
    /**
     * Generate a unique token with an expiration date to allow for sign up.
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static signUpGenerateTokenCreate(
        requestBody: GenerateToken,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sign_up/generate_token/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `No response body`,
            },
        });
    }
    /**
     * Given a username with a token, returns the token. This is usefull for the admin to go back and get the token again if the page reloads.
     * @returns any No response body
     * @throws ApiError
     */
    public static signUpGetTokenByUsernameRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sign_up/get_token_by_username/',
            errors: {
                400: `No response body`,
            },
        });
    }
    /**
     * Given the token provided in the URL, simply return the username associated with it.
     * @returns any No response body
     * @throws ApiError
     */
    public static signUpGetTokenUsernameRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sign_up/get_token_username/',
            errors: {
                400: `No response body`,
            },
        });
    }
    /**
     * Register a new user with username, email and password.
     * @param requestBody
     * @returns any No response body
     * @throws ApiError
     */
    public static signUpRegisterUserCreate(
        requestBody: RegisterUser,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sign_up/register_user/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `No response body`,
            },
        });
    }
}
