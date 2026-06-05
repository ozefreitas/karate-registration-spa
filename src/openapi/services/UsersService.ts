/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClubMemberStats } from '../models/ClubMemberStats';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Lists the current users available users.
     * @returns any No response body
     * @throws ApiError
     */
    public static usersRetrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
        });
    }
    /**
     * Returns member statistics per club
     * @returns ClubMemberStats
     * @throws ApiError
     */
    public static usersMembersList(): CancelablePromise<Array<ClubMemberStats>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/members/',
        });
    }
}
