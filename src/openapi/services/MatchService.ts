/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { AdvanceMatch } from '../models/AdvanceMatch';
import type { CreateMatch } from '../models/CreateMatch';
import type { Match } from '../models/Match';
import type { PatchedAdvanceMatch } from '../models/PatchedAdvanceMatch';
import type { PatchedPatchMatchWinner } from '../models/PatchedPatchMatchWinner';
import type { PatchedPreviousMatch } from '../models/PatchedPreviousMatch';
import type { PatchedUpdateMatch } from '../models/PatchedUpdateMatch';
import type { PatchMatchWinner } from '../models/PatchMatchWinner';
import type { PreviousMatch } from '../models/PreviousMatch';
import type { UpdateMatch } from '../models/UpdateMatch';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MatchService {
    /**
     * @param bracket
     * @param event
     * @returns Match
     * @throws ApiError
     */
    public static matchList(
        bracket?: string,
        event?: string,
    ): CancelablePromise<Array<Match>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/match/',
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
     * @returns UpdateMatch
     * @throws ApiError
     */
    public static matchUpdate(
        id: number,
        requestBody?: UpdateMatch,
    ): CancelablePromise<UpdateMatch> {
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
     * @returns UpdateMatch
     * @throws ApiError
     */
    public static matchPartialUpdate(
        id: number,
        requestBody?: PatchedUpdateMatch,
    ): CancelablePromise<UpdateMatch> {
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
    /**
     * @param id A unique integer value identifying this match.
     * @param requestBody
     * @returns AdvanceMatch
     * @throws ApiError
     */
    public static matchAdvanceMatchPartialUpdate(
        id: number,
        requestBody?: PatchedAdvanceMatch,
    ): CancelablePromise<AdvanceMatch> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/match/{id}/advance_match/',
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
     * @returns PatchMatchWinner
     * @throws ApiError
     */
    public static matchSetWinnerPartialUpdate(
        id: number,
        requestBody?: PatchedPatchMatchWinner,
    ): CancelablePromise<PatchMatchWinner> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/match/{id}/set_winner/',
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
     * @returns PreviousMatch
     * @throws ApiError
     */
    public static matchTrackBackMatchPartialUpdate(
        id: number,
        requestBody?: PatchedPreviousMatch,
    ): CancelablePromise<PreviousMatch> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/match/{id}/track_back_match/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
