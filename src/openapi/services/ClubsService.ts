/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Clubs } from '../models/Clubs';
import type { CreateClub } from '../models/CreateClub';
import type { PaginatedClubsList } from '../models/PaginatedClubsList';
import type { PatchedClubs } from '../models/PatchedClubs';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClubsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedClubsList
     * @throws ApiError
     */
    public static clubsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedClubsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clubs/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateClub
     * @throws ApiError
     */
    public static clubsCreate(
        requestBody: CreateClub,
    ): CancelablePromise<CreateClub> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/clubs/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club.
     * @returns Clubs
     * @throws ApiError
     */
    public static clubsRetrieve(
        id: number,
    ): CancelablePromise<Clubs> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/clubs/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this club.
     * @param requestBody
     * @returns Clubs
     * @throws ApiError
     */
    public static clubsUpdate(
        id: number,
        requestBody: Clubs,
    ): CancelablePromise<Clubs> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/clubs/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club.
     * @param requestBody
     * @returns Clubs
     * @throws ApiError
     */
    public static clubsPartialUpdate(
        id: number,
        requestBody?: PatchedClubs,
    ): CancelablePromise<Clubs> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/clubs/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club.
     * @returns void
     * @throws ApiError
     */
    public static clubsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/clubs/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
