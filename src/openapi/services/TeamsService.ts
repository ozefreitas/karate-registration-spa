/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTeam } from '../models/CreateTeam';
import type { PaginatedTeamsList } from '../models/PaginatedTeamsList';
import type { PatchedTeams } from '../models/PatchedTeams';
import type { Teams } from '../models/Teams';
import type { UpdateTeams } from '../models/UpdateTeams';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TeamsService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedTeamsList
     * @throws ApiError
     */
    public static teamsList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedTeamsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/teams/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateTeam
     * @throws ApiError
     */
    public static teamsCreate(
        requestBody: CreateTeam,
    ): CancelablePromise<CreateTeam> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/teams/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this team.
     * @returns Teams
     * @throws ApiError
     */
    public static teamsRetrieve(
        id: string,
    ): CancelablePromise<Teams> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/teams/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this team.
     * @param requestBody
     * @returns UpdateTeams
     * @throws ApiError
     */
    public static teamsUpdate(
        id: string,
        requestBody: UpdateTeams,
    ): CancelablePromise<UpdateTeams> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/teams/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this team.
     * @param requestBody
     * @returns Teams
     * @throws ApiError
     */
    public static teamsPartialUpdate(
        id: string,
        requestBody?: PatchedTeams,
    ): CancelablePromise<Teams> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/teams/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this team.
     * @returns void
     * @throws ApiError
     */
    public static teamsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/teams/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static teamsDeleteAllDestroy(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/teams/delete_all/',
        });
    }
    /**
     * @returns Teams
     * @throws ApiError
     */
    public static teamsLastFiveList(): CancelablePromise<Array<Teams>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/teams/last_five/',
        });
    }
}
