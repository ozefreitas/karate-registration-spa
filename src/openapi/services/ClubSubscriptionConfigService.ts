/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { ClubSubscriptionConfig } from '../models/ClubSubscriptionConfig';
import type { PatchedClubSubscriptionConfig } from '../models/PatchedClubSubscriptionConfig';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClubSubscriptionConfigService {
    /**
     * @returns ClubSubscriptionConfig
     * @throws ApiError
     */
    public static clubSubscriptionConfigList(): CancelablePromise<Array<ClubSubscriptionConfig>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_subscription_config/',
        });
    }
    /**
     * @param requestBody
     * @returns ClubSubscriptionConfig
     * @throws ApiError
     */
    public static clubSubscriptionConfigCreate(
        requestBody?: ClubSubscriptionConfig,
    ): CancelablePromise<ClubSubscriptionConfig> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/club_subscription_config/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ClubSubscriptionConfig
     * @throws ApiError
     */
    public static clubSubscriptionConfigRetrieve(
        id: string,
    ): CancelablePromise<ClubSubscriptionConfig> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_subscription_config/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ClubSubscriptionConfig
     * @throws ApiError
     */
    public static clubSubscriptionConfigUpdate(
        id: string,
        requestBody?: ClubSubscriptionConfig,
    ): CancelablePromise<ClubSubscriptionConfig> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/club_subscription_config/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ClubSubscriptionConfig
     * @throws ApiError
     */
    public static clubSubscriptionConfigPartialUpdate(
        id: string,
        requestBody?: PatchedClubSubscriptionConfig,
    ): CancelablePromise<ClubSubscriptionConfig> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/club_subscription_config/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static clubSubscriptionConfigDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/club_subscription_config/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns ClubSubscriptionConfig
     * @throws ApiError
     */
    public static clubSubscriptionConfigMeRetrieve(): CancelablePromise<ClubSubscriptionConfig> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_subscription_config/me/',
        });
    }
}
