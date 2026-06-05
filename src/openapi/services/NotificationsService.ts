/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { AllUsersNotifications } from '../models/AllUsersNotifications';
import type { CreateNotifications } from '../models/CreateNotifications';
import type { Notifications } from '../models/Notifications';
import type { PaginatedNotificationsList } from '../models/PaginatedNotificationsList';
import type { PatchedNotifications } from '../models/PatchedNotifications';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NotificationsService {
    /**
     * @param canRemove
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param type
     * @param userId
     * @returns PaginatedNotificationsList
     * @throws ApiError
     */
    public static notificationsList(
        canRemove?: boolean,
        ordering?: string,
        page?: number,
        pageSize?: number,
        type?: string,
        userId?: string,
    ): CancelablePromise<PaginatedNotificationsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notifications/',
            query: {
                'can_remove': canRemove,
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
                'type': type,
                'user_id': userId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateNotifications
     * @throws ApiError
     */
    public static notificationsCreate(
        requestBody: CreateNotifications,
    ): CancelablePromise<CreateNotifications> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notifications/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this notification.
     * @returns Notifications
     * @throws ApiError
     */
    public static notificationsRetrieve(
        id: number,
    ): CancelablePromise<Notifications> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this notification.
     * @param requestBody
     * @returns Notifications
     * @throws ApiError
     */
    public static notificationsUpdate(
        id: number,
        requestBody: Notifications,
    ): CancelablePromise<Notifications> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/notifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this notification.
     * @param requestBody
     * @returns Notifications
     * @throws ApiError
     */
    public static notificationsPartialUpdate(
        id: number,
        requestBody?: PatchedNotifications,
    ): CancelablePromise<Notifications> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/notifications/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this notification.
     * @returns void
     * @throws ApiError
     */
    public static notificationsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/notifications/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param requestBody
     * @returns AllUsersNotifications
     * @throws ApiError
     */
    public static notificationsCreateAllUsersCreate(
        requestBody: AllUsersNotifications,
    ): CancelablePromise<AllUsersNotifications> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/notifications/create_all_users/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
