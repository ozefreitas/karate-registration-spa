/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClubMemberStats } from '../models/ClubMemberStats';
import type { PaginatedUsersList } from '../models/PaginatedUsersList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Lists users or fetches a specific user by username.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedUsersList
     * @throws ApiError
     */
    public static usersList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedUsersList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
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
