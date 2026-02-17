/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MembersPaymentsStatus } from '../models/MembersPaymentsStatus';
import type { PaginatedPersonList } from '../models/PaginatedPersonList';
import type { PatchedPerson } from '../models/PatchedPerson';
import type { Person } from '../models/Person';
import type { UploadMemberProfilePicture } from '../models/UploadMemberProfilePicture';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PersonsService {
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
     * @returns PaginatedPersonList
     * @throws ApiError
     */
    public static personsList(
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
    ): CancelablePromise<PaginatedPersonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/',
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
     * @returns Person
     * @throws ApiError
     */
    public static personsCreate(
        requestBody: Person,
    ): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/persons/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this person.
     * @returns Person
     * @throws ApiError
     */
    public static personsRetrieve(
        id: string,
    ): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this person.
     * @param requestBody
     * @returns Person
     * @throws ApiError
     */
    public static personsUpdate(
        id: string,
        requestBody: Person,
    ): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/persons/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this person.
     * @param requestBody
     * @returns Person
     * @throws ApiError
     */
    public static personsPartialUpdate(
        id: string,
        requestBody?: PatchedPerson,
    ): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/persons/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique value identifying this person.
     * @returns void
     * @throws ApiError
     */
    public static personsDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/persons/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param eventId
     * @param id A unique value identifying this person.
     * @returns Person
     * @throws ApiError
     */
    public static personsUnregisteredModalitiesRetrieve(
        eventId: string,
        id: string,
    ): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/{id}/unregistered_modalities/{event_id}/',
            path: {
                'event_id': eventId,
                'id': id,
            },
        });
    }
    /**
     * @param id A unique value identifying this person.
     * @param requestBody
     * @returns Person
     * @throws ApiError
     */
    public static personsUploadImageCreate(
        id: string,
        requestBody?: UploadMemberProfilePicture,
    ): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/persons/{id}/upload-image/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static personsDeleteAllDestroy(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/persons/delete_all/',
        });
    }
    /**
     * @returns Person
     * @throws ApiError
     */
    public static personsLastFiveRetrieve(): CancelablePromise<Person> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/last_five/',
        });
    }
    /**
     * @returns MembersPaymentsStatus
     * @throws ApiError
     */
    public static personsMembersPaymentsStatusRetrieve(): CancelablePromise<MembersPaymentsStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/members_payments_status/',
        });
    }
}
