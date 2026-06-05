/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { CreateMatch } from '../models/CreateMatch';
import type { PatchedUpdateScoringEntry } from '../models/PatchedUpdateScoringEntry';
import type { ScoringEntry } from '../models/ScoringEntry';
import type { UpdateScoringEntry } from '../models/UpdateScoringEntry';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScoringEntryService {
    /**
     * @param bracket
     * @param event
     * @returns ScoringEntry
     * @throws ApiError
     */
    public static scoringEntryList(
        bracket?: string,
        event?: string,
    ): CancelablePromise<Array<ScoringEntry>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/scoring_entry/',
            query: {
                'bracket': bracket,
                'event': event,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateMatch
     * @throws ApiError
     */
    public static scoringEntryCreate(
        requestBody: CreateMatch,
    ): CancelablePromise<CreateMatch> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/scoring_entry/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this scoring entry.
     * @returns ScoringEntry
     * @throws ApiError
     */
    public static scoringEntryRetrieve(
        id: number,
    ): CancelablePromise<ScoringEntry> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/scoring_entry/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this scoring entry.
     * @param requestBody
     * @returns UpdateScoringEntry
     * @throws ApiError
     */
    public static scoringEntryUpdate(
        id: number,
        requestBody?: UpdateScoringEntry,
    ): CancelablePromise<UpdateScoringEntry> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/scoring_entry/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this scoring entry.
     * @param requestBody
     * @returns UpdateScoringEntry
     * @throws ApiError
     */
    public static scoringEntryPartialUpdate(
        id: number,
        requestBody?: PatchedUpdateScoringEntry,
    ): CancelablePromise<UpdateScoringEntry> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/scoring_entry/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this scoring entry.
     * @returns void
     * @throws ApiError
     */
    public static scoringEntryDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/scoring_entry/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
