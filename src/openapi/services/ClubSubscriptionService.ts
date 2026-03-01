/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailableQuoteYears } from '../models/AvailableQuoteYears';
import type { ClubSubscriptions } from '../models/ClubSubscriptions';
import type { CreateAllClubsSubscription } from '../models/CreateAllClubsSubscription';
import type { CreateClubSubscription } from '../models/CreateClubSubscription';
import type { PatchClubSubscription } from '../models/PatchClubSubscription';
import type { PatchedPatchClubSubscription } from '../models/PatchedPatchClubSubscription';
import type { PatchedUpdateClubSubscriptionAmount } from '../models/PatchedUpdateClubSubscriptionAmount';
import type { PatchedUpdateClubSubscriptionConfigAmount } from '../models/PatchedUpdateClubSubscriptionConfigAmount';
import type { PatchedUpdateClubSubscriptionDueDate } from '../models/PatchedUpdateClubSubscriptionDueDate';
import type { UpdateClubSubscriptionAmount } from '../models/UpdateClubSubscriptionAmount';
import type { UpdateClubSubscriptionConfigAmount } from '../models/UpdateClubSubscriptionConfigAmount';
import type { UpdateClubSubscriptionDueDate } from '../models/UpdateClubSubscriptionDueDate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClubSubscriptionService {
    /**
     * @param search A search term.
     * @returns ClubSubscriptions
     * @throws ApiError
     */
    public static clubSubscriptionList(
        search?: string,
    ): CancelablePromise<Array<ClubSubscriptions>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_subscription/',
            query: {
                'search': search,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateClubSubscription
     * @throws ApiError
     */
    public static clubSubscriptionCreate(
        requestBody: CreateClubSubscription,
    ): CancelablePromise<CreateClubSubscription> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/club_subscription/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club subscription.
     * @returns ClubSubscriptions
     * @throws ApiError
     */
    public static clubSubscriptionRetrieve(
        id: number,
    ): CancelablePromise<ClubSubscriptions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_subscription/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this club subscription.
     * @param requestBody
     * @returns ClubSubscriptions
     * @throws ApiError
     */
    public static clubSubscriptionUpdate(
        id: number,
        requestBody: ClubSubscriptions,
    ): CancelablePromise<ClubSubscriptions> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/club_subscription/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club subscription.
     * @param requestBody
     * @returns PatchClubSubscription
     * @throws ApiError
     */
    public static clubSubscriptionPartialUpdate(
        id: number,
        requestBody?: PatchedPatchClubSubscription,
    ): CancelablePromise<PatchClubSubscription> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/club_subscription/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this club subscription.
     * @returns void
     * @throws ApiError
     */
    public static clubSubscriptionDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/club_subscription/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * An endpoint that targets all children accounts of an admin, in order to create new subscription objects in the given year
     * @param requestBody
     * @returns CreateAllClubsSubscription
     * @throws ApiError
     */
    public static clubSubscriptionCreateAllUsersCreate(
        requestBody: CreateAllClubsSubscription,
    ): CancelablePromise<CreateAllClubsSubscription> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/club_subscription/create_all_users/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns AvailableQuoteYears
     * @throws ApiError
     */
    public static clubSubscriptionGetAvailableQuoteYearsRetrieve(): CancelablePromise<AvailableQuoteYears> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/club_subscription/get_available_quote_years/',
        });
    }
    /**
     * An endpoint that targets all children accounts of an admin, in order to, update all subscription object if the given year,with a new amount
     * @param requestBody
     * @returns UpdateClubSubscriptionAmount
     * @throws ApiError
     */
    public static clubSubscriptionUpdateAllUsersAmountPartialUpdate(
        requestBody?: PatchedUpdateClubSubscriptionAmount,
    ): CancelablePromise<UpdateClubSubscriptionAmount> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/club_subscription/update_all_users_amount/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * An endpoint that targets all children accounts of an admin, in order to, update all subscription object if the given year,with a new expiration date
     * @param requestBody
     * @returns UpdateClubSubscriptionDueDate
     * @throws ApiError
     */
    public static clubSubscriptionUpdateAllUsersDueDatePartialUpdate(
        requestBody?: PatchedUpdateClubSubscriptionDueDate,
    ): CancelablePromise<UpdateClubSubscriptionDueDate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/club_subscription/update_all_users_due_date/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns UpdateClubSubscriptionConfigAmount
     * @throws ApiError
     */
    public static clubSubscriptionUpdateSubscriptionAmountPartialUpdate(
        requestBody?: PatchedUpdateClubSubscriptionConfigAmount,
    ): CancelablePromise<UpdateClubSubscriptionConfigAmount> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/club_subscription/update_subscription_amount/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
