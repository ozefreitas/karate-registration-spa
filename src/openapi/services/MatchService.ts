/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMatch } from '../models/CreateMatch';
import type { Match } from '../models/Match';
import type { PaginatedMatchList } from '../models/PaginatedMatchList';
import type { PatchedMatch } from '../models/PatchedMatch';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MatchService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMatchList
     * @throws ApiError
     */
    public static matchList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMatchList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/match/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateMatch
     * @throws ApiError
     */
    public static matchCreate(
        requestBody: CreateMatch,
    ): CancelablePromise<CreateMatch> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/match/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this match.
     * @returns Match
     * @throws ApiError
     */
    public static matchRetrieve(
        id: number,
    ): CancelablePromise<Match> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/match/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this match.
     * @param requestBody
     * @returns Match
     * @throws ApiError
     */
    public static matchUpdate(
        id: number,
        requestBody: Match,
    ): CancelablePromise<Match> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/match/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this match.
     * @param requestBody
     * @returns Match
     * @throws ApiError
     */
    public static matchPartialUpdate(
        id: number,
        requestBody?: PatchedMatch,
    ): CancelablePromise<Match> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/match/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this match.
     * @returns void
     * @throws ApiError
     */
    public static matchDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/match/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
