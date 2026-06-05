/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddMember } from '../models/AddMember';
import type { CheckEventRate } from '../models/CheckEventRate';
import type { CreateEvent } from '../models/CreateEvent';
import type { DeleteMember } from '../models/DeleteMember';
import type { Events } from '../models/Events';
import type { GenerateDrawRequest } from '../models/GenerateDrawRequest';
import type { GenerateDrawResponse } from '../models/GenerateDrawResponse';
import type { PaginatedCompactEventsList } from '../models/PaginatedCompactEventsList';
import type { PaginatedEventRegistrationCountList } from '../models/PaginatedEventRegistrationCountList';
import type { PatchedEvents } from '../models/PatchedEvents';
import type { Rating } from '../models/Rating';
import type { UpdateEvent } from '../models/UpdateEvent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventsService {
    /**
     * @param hasCategories
     * @param hasEnded
     * @param hasRegistrations
     * @param hasTeams
     * @param inDay
     * @param inMonth
     * @param isOngoing
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param season
     * @returns PaginatedCompactEventsList
     * @throws ApiError
     */
    public static eventsList(
        hasCategories?: boolean,
        hasEnded?: boolean,
        hasRegistrations?: boolean,
        hasTeams?: boolean,
        inDay?: string,
        inMonth?: string,
        isOngoing?: boolean,
        ordering?: string,
        page?: number,
        pageSize?: number,
        season?: string,
    ): CancelablePromise<PaginatedCompactEventsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/',
            query: {
                'has_categories': hasCategories,
                'has_ended': hasEnded,
                'has_registrations': hasRegistrations,
                'has_teams': hasTeams,
                'in_day': inDay,
                'in_month': inMonth,
                'is_ongoing': isOngoing,
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
                'season': season,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateEvent
     * @throws ApiError
     */
    public static eventsCreate(
        requestBody: CreateEvent,
    ): CancelablePromise<CreateEvent> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @returns Events
     * @throws ApiError
     */
    public static eventsRetrieve(
        id: string,
    ): CancelablePromise<Events> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @param requestBody
     * @returns UpdateEvent
     * @throws ApiError
     */
    public static eventsUpdate(
        id: string,
        requestBody: UpdateEvent,
    ): CancelablePromise<UpdateEvent> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/events/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @param requestBody
     * @returns Events
     * @throws ApiError
     */
    public static eventsPartialUpdate(
        id: string,
        requestBody?: PatchedEvents,
    ): CancelablePromise<Events> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/events/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @returns void
     * @throws ApiError
     */
    public static eventsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @param requestBody
     * @returns AddMember
     * @throws ApiError
     */
    public static eventsAddMemberCreate(
        id: string,
        requestBody: AddMember,
    ): CancelablePromise<AddMember> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{id}/add_member/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @returns CheckEventRate
     * @throws ApiError
     */
    public static eventsCheckEventRateRetrieve(
        id: string,
    ): CancelablePromise<CheckEventRate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{id}/check_event_rate/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @returns void
     * @throws ApiError
     */
    public static eventsDeleteDrawDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{id}/delete_draw/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @param requestBody
     * @returns DeleteMember
     * @throws ApiError
     */
    public static eventsDeleteMemberCreate(
        id: string,
        requestBody: DeleteMember,
    ): CancelablePromise<DeleteMember> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{id}/delete_member/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @returns Events
     * @throws ApiError
     */
    public static eventsExportMembersExcelRetrieve(
        id: string,
    ): CancelablePromise<Events> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{id}/export_members_excel/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @param requestBody
     * @returns GenerateDrawResponse
     * @throws ApiError
     */
    public static eventsGenerateDrawCreate(
        id: string,
        requestBody: GenerateDrawRequest,
    ): CancelablePromise<GenerateDrawResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{id}/generate_draw/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @param requestBody
     * @returns Events
     * @throws ApiError
     */
    public static eventsGenerateDrawPdfCreate(
        id: string,
        requestBody: Events,
    ): CancelablePromise<Events> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{id}/generate_draw_pdf/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this event.
     * @param requestBody
     * @returns CheckEventRate
     * @throws ApiError
     */
    public static eventsRateEventCreate(
        id: string,
        requestBody: Rating,
    ): CancelablePromise<CheckEventRate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{id}/rate_event/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Events
     * @throws ApiError
     */
    public static eventsLastEventRetrieve(): CancelablePromise<Events> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/last_event/',
        });
    }
    /**
     * @returns Events
     * @throws ApiError
     */
    public static eventsNextEventRetrieve(): CancelablePromise<Events> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/next_event/',
        });
    }
    /**
     * @param hasCategories
     * @param hasEnded
     * @param hasRegistrations
     * @param hasTeams
     * @param inDay
     * @param inMonth
     * @param isOngoing
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param season
     * @returns PaginatedEventRegistrationCountList
     * @throws ApiError
     */
    public static eventsRegistrationCountsList(
        hasCategories?: boolean,
        hasEnded?: boolean,
        hasRegistrations?: boolean,
        hasTeams?: boolean,
        inDay?: string,
        inMonth?: string,
        isOngoing?: boolean,
        ordering?: string,
        page?: number,
        pageSize?: number,
        season?: string,
    ): CancelablePromise<PaginatedEventRegistrationCountList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/registration-counts/',
            query: {
                'has_categories': hasCategories,
                'has_ended': hasEnded,
                'has_registrations': hasRegistrations,
                'has_teams': hasTeams,
                'in_day': inDay,
                'in_month': inMonth,
                'is_ongoing': isOngoing,
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
                'season': season,
            },
        });
    }
}
