/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bracket } from '../models/Bracket';
import type { CompactPerson } from '../models/CompactPerson';
import type { CompactTeam } from '../models/CompactTeam';
import type { CreateBracket } from '../models/CreateBracket';
import type { PatchedBracket } from '../models/PatchedBracket';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BracketService {
    /**
     * @param event
     * @returns Bracket
     * @throws ApiError
     */
    public static bracketList(
        event?: string,
    ): CancelablePromise<Array<Bracket>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bracket/',
            query: {
                'event': event,
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
    /**
     * @param id A unique integer value identifying this bracket.
     * @returns Bracket
     * @throws ApiError
     */
    public static bracketExportBracketDrawRetrieve(
        id: number,
    ): CancelablePromise<Bracket> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bracket/{id}/export_bracket_draw/',
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
    public static bracketGenerateBracketDrawCreate(
        id: number,
        requestBody: Bracket,
    ): CancelablePromise<Bracket> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bracket/{id}/generate_bracket_draw/',
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
    public static bracketOfficializeCreate(
        id: number,
        requestBody: Bracket,
    ): CancelablePromise<Bracket> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bracket/{id}/officialize/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this bracket.
     * @param event
     * @returns CompactPerson
     * @throws ApiError
     */
    public static bracketPersonsList(
        id: number,
        event?: string,
    ): CancelablePromise<Array<CompactPerson>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bracket/{id}/persons/',
            path: {
                'id': id,
            },
            query: {
                'event': event,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this bracket.
     * @param event
     * @returns CompactTeam
     * @throws ApiError
     */
    public static bracketTeamsList(
        id: number,
        event?: string,
    ): CancelablePromise<Array<CompactTeam>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bracket/{id}/teams/',
            path: {
                'id': id,
            },
            query: {
                'event': event,
            },
        });
    }
}
