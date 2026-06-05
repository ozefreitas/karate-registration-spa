/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClubSettings } from '../models/ClubSettings';
import type { CreateClubSettigs } from '../models/CreateClubSettigs';
import type { PatchClubSettigs } from '../models/PatchClubSettigs';
import type { PatchedPatchClubSettigs } from '../models/PatchedPatchClubSettigs';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClubSettingsService {
    /**
     * @returns ClubSettings
     * @throws ApiError
     */
    public static clubSettingsList(): CancelablePromise<Array<ClubSettings>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_settings/',
        });
    }
    /**
     * @param requestBody
     * @returns CreateClubSettigs
     * @throws ApiError
     */
    public static clubSettingsCreate(
        requestBody?: CreateClubSettigs,
    ): CancelablePromise<CreateClubSettigs> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/club_settings/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club settings.
     * @returns ClubSettings
     * @throws ApiError
     */
    public static clubSettingsRetrieve(
        id: number,
    ): CancelablePromise<ClubSettings> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_settings/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this club settings.
     * @param requestBody
     * @returns ClubSettings
     * @throws ApiError
     */
    public static clubSettingsUpdate(
        id: number,
        requestBody?: ClubSettings,
    ): CancelablePromise<ClubSettings> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/club_settings/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club settings.
     * @param requestBody
     * @returns PatchClubSettigs
     * @throws ApiError
     */
    public static clubSettingsPartialUpdate(
        id: number,
        requestBody?: PatchedPatchClubSettigs,
    ): CancelablePromise<PatchClubSettigs> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/club_settings/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club settings.
     * @returns void
     * @throws ApiError
     */
    public static clubSettingsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/club_settings/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
