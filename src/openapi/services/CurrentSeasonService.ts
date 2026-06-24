/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrentSeason } from '../models/CurrentSeason';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CurrentSeasonService {
    /**
     * Typical sportif season change in August. This endpoint checks the current month and returns the respective season.
     * @returns CurrentSeason
     * @throws ApiError
     */
    public static currentSeasonRetrieve(): CancelablePromise<CurrentSeason> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/current_season/',
        });
    }
}
