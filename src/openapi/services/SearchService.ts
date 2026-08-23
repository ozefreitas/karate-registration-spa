/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResponse } from '../models/SearchResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SearchService {
    /**
     * Search across the user's accessible records (people, etc). Results are scoped to the requesting user's club/ownership.
     * @param q Search query (min 2 characters)
     * @returns SearchResponse
     * @throws ApiError
     */
    public static globalSearch(
        q: string,
    ): CancelablePromise<SearchResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/',
            query: {
                'q': q,
            },
        });
    }
}
