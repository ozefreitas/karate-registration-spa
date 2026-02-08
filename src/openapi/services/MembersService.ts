/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Members } from '../models/Members';
import type { PaginatedMembersList } from '../models/PaginatedMembersList';
import type { PatchedMembers } from '../models/PatchedMembers';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MembersService {
    /**
     * @param coachNotInEvent
     * @param inCategory
     * @param inGender
     * @param inMemberType
     * @param inUser
     * @param isQuotesLegible
     * @param isValidated
     * @param monthlyPaymentStatus
     * @param notInEvent
     * @param ordering Which field to use when ordering the results.
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMembersList
     * @throws ApiError
     */
    public static membersList(
        coachNotInEvent?: string,
        inCategory?: string,
        inGender?: string,
        inMemberType?: string,
        inUser?: string,
        isQuotesLegible?: boolean,
        isValidated?: boolean,
        monthlyPaymentStatus?: string,
        notInEvent?: string,
        ordering?: string,
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMembersList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/members/',
            query: {
                'coach_not_in_event': coachNotInEvent,
                'in_category': inCategory,
                'in_gender': inGender,
                'in_member_type': inMemberType,
                'in_user': inUser,
                'is_quotes_legible': isQuotesLegible,
                'is_validated': isValidated,
                'monthly_payment_status': monthlyPaymentStatus,
                'not_in_event': notInEvent,
                'ordering': ordering,
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Members
     * @throws ApiError
     */
    public static membersCreate(
        requestBody: Members,
    ): CancelablePromise<Members> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/members/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this member.
     * @returns Members
     * @throws ApiError
     */
    public static membersRetrieve(
        id: string,
    ): CancelablePromise<Members> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/members/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this member.
     * @param requestBody
     * @returns Members
     * @throws ApiError
     */
    public static membersUpdate(
        id: string,
        requestBody: Members,
    ): CancelablePromise<Members> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/members/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this member.
     * @param requestBody
     * @returns Members
     * @throws ApiError
     */
    public static membersPartialUpdate(
        id: string,
        requestBody?: PatchedMembers,
    ): CancelablePromise<Members> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/members/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this member.
     * @returns void
     * @throws ApiError
     */
    public static membersDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/members/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param eventId
     * @param id A unique value identifying this member.
     * @returns Members
     * @throws ApiError
     */
    public static membersUnregisteredModalitiesRetrieve(
        eventId: string,
        id: string,
    ): CancelablePromise<Members> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/members/{id}/unregistered_modalities/{event_id}/',
            path: {
                'event_id': eventId,
                'id': id,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static membersDeleteAllDestroy(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/members/delete_all/',
        });
    }
    /**
     * @returns Members
     * @throws ApiError
     */
    public static membersLastFiveRetrieve(): CancelablePromise<Members> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/members/last_five/',
        });
    }
}
