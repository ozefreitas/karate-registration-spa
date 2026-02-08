/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bracket } from '../models/Bracket';
import type { CreateBracket } from '../models/CreateBracket';
import type { PaginatedBracketList } from '../models/PaginatedBracketList';
import type { PatchedBracket } from '../models/PatchedBracket';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BracketService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedBracketList
     * @throws ApiError
     */
    public static bracketList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedBracketList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bracket/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateBracket
     * @throws ApiError
     */
    public static bracketCreate(
        requestBody: CreateBracket,
    ): CancelablePromise<CreateBracket> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bracket/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this bracket.
     * @returns Bracket
     * @throws ApiError
     */
    public static bracketRetrieve(
        id: number,
    ): CancelablePromise<Bracket> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bracket/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this bracket.
     * @param requestBody
     * @returns Bracket
     * @throws ApiError
     */
    public static bracketUpdate(
        id: number,
        requestBody: Bracket,
    ): CancelablePromise<Bracket> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/bracket/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this bracket.
     * @param requestBody
     * @returns Bracket
     * @throws ApiError
     */
    public static bracketPartialUpdate(
        id: number,
        requestBody?: PatchedBracket,
    ): CancelablePromise<Bracket> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/bracket/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this bracket.
     * @returns void
     * @throws ApiError
     */
    public static bracketDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/bracket/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
