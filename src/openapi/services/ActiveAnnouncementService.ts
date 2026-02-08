/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedAnnouncementList } from '../models/PaginatedAnnouncementList';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActiveAnnouncementService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedAnnouncementList
     * @throws ApiError
     */
    public static activeAnnouncementList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedAnnouncementList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/active_announcement/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
}
