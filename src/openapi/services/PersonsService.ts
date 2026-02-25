/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedPersonsList } from '../models/PaginatedPersonsList';
import type { PatchedPersons } from '../models/PatchedPersons';
import type { Persons } from '../models/Persons';
import type { PersonsPaymentsStatus } from '../models/PersonsPaymentsStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PersonsService {
    /**
     * @param coachNotInEvent
     * @param disciplineId
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
     * @returns PaginatedPersonsList
     * @throws ApiError
     */
    public static personsList(
        coachNotInEvent?: string,
        disciplineId?: string,
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
    ): CancelablePromise<PaginatedPersonsList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/',
            query: {
                'coach_not_in_event': coachNotInEvent,
                'discipline_id': disciplineId,
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
     * @param formData
     * @returns Persons
     * @throws ApiError
     */
    public static personsCreate(
        formData: Persons,
    ): CancelablePromise<Persons> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/persons/',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A unique value identifying this person.
     * @returns Persons
     * @throws ApiError
     */
    public static personsRetrieve(
        id: string,
    ): CancelablePromise<Persons> {
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
     * @param formData
     * @returns Persons
     * @throws ApiError
     */
    public static personsUpdate(
        id: string,
        formData: Persons,
    ): CancelablePromise<Persons> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/persons/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * @param id A unique value identifying this person.
     * @param formData
     * @returns Persons
     * @throws ApiError
     */
    public static personsPartialUpdate(
        id: string,
        formData?: PatchedPersons,
    ): CancelablePromise<Persons> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/persons/{id}/',
            path: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
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
     * @returns Persons
     * @throws ApiError
     */
    public static personsUnregisteredModalitiesRetrieve(
        eventId: string,
        id: string,
    ): CancelablePromise<Persons> {
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
     * @param coachNotInEvent
     * @param disciplineId
     * @param inCategory
     * @param inGender
     * @param inMemberType
     * @param inUser
     * @param isQuotesLegible
     * @param isValidated
     * @param monthlyPaymentStatus
     * @param notInEvent
     * @param ordering Which field to use when ordering the results.
     * @returns Persons
     * @throws ApiError
     */
    public static personsLastFiveList(
        coachNotInEvent?: string,
        disciplineId?: string,
        inCategory?: string,
        inGender?: string,
        inMemberType?: string,
        inUser?: string,
        isQuotesLegible?: boolean,
        isValidated?: boolean,
        monthlyPaymentStatus?: string,
        notInEvent?: string,
        ordering?: string,
    ): CancelablePromise<Array<Persons>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/last_five/',
            query: {
                'coach_not_in_event': coachNotInEvent,
                'discipline_id': disciplineId,
                'in_category': inCategory,
                'in_gender': inGender,
                'in_member_type': inMemberType,
                'in_user': inUser,
                'is_quotes_legible': isQuotesLegible,
                'is_validated': isValidated,
                'monthly_payment_status': monthlyPaymentStatus,
                'not_in_event': notInEvent,
                'ordering': ordering,
            },
        });
    }
    /**
     * @returns PersonsPaymentsStatus
     * @throws ApiError
     */
    public static personsMembersPaymentsStatusRetrieve(): CancelablePromise<PersonsPaymentsStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/persons/members_payments_status/',
        });
    }
}
