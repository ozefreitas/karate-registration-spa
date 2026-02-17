/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MemberShips } from '../models/MemberShips';
import type { PaginatedMemberShipsList } from '../models/PaginatedMemberShipsList';
import type { PatchedMemberShips } from '../models/PatchedMemberShips';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MembershipsService {
    /**
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMemberShipsList
     * @throws ApiError
     */
    public static membershipsList(
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMemberShipsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/memberships/',
            query: {
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns MemberShips
     * @throws ApiError
     */
    public static membershipsCreate(
        requestBody: MemberShips,
    ): CancelablePromise<MemberShips> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/memberships/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this membership.
     * @returns MemberShips
     * @throws ApiError
     */
    public static membershipsRetrieve(
        id: number,
    ): CancelablePromise<MemberShips> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/memberships/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this membership.
     * @param requestBody
     * @returns MemberShips
     * @throws ApiError
     */
    public static membershipsUpdate(
        id: number,
        requestBody: MemberShips,
    ): CancelablePromise<MemberShips> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/memberships/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this membership.
     * @param requestBody
     * @returns MemberShips
     * @throws ApiError
     */
    public static membershipsPartialUpdate(
        id: number,
        requestBody?: PatchedMemberShips,
    ): CancelablePromise<MemberShips> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/memberships/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this membership.
     * @returns void
     * @throws ApiError
     */
    public static membershipsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/memberships/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
