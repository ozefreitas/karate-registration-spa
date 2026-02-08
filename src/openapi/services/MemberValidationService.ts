/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMemberValidationRequest } from '../models/CreateMemberValidationRequest';
import type { MemberValidationRequest } from '../models/MemberValidationRequest';
import type { PaginatedMemberValidationRequestList } from '../models/PaginatedMemberValidationRequestList';
import type { PatchedPatchMemberValidationRequest } from '../models/PatchedPatchMemberValidationRequest';
import type { PatchMemberValidationRequest } from '../models/PatchMemberValidationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MemberValidationService {
    /**
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @returns PaginatedMemberValidationRequestList
     * @throws ApiError
     */
    public static memberValidationList(
        page?: number,
        pageSize?: number,
    ): CancelablePromise<PaginatedMemberValidationRequestList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/member_validation/',
            query: {
                'page': page,
                'page_size': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateMemberValidationRequest
     * @throws ApiError
     */
    public static memberValidationCreate(
        requestBody: CreateMemberValidationRequest,
    ): CancelablePromise<CreateMemberValidationRequest> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/member_validation/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this member validation request.
     * @returns MemberValidationRequest
     * @throws ApiError
     */
    public static memberValidationRetrieve(
        id: number,
    ): CancelablePromise<MemberValidationRequest> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/member_validation/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this member validation request.
     * @param requestBody
     * @returns MemberValidationRequest
     * @throws ApiError
     */
    public static memberValidationUpdate(
        id: number,
        requestBody: MemberValidationRequest,
    ): CancelablePromise<MemberValidationRequest> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/member_validation/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this member validation request.
     * @param requestBody
     * @returns PatchMemberValidationRequest
     * @throws ApiError
     */
    public static memberValidationPartialUpdate(
        id: number,
        requestBody?: PatchedPatchMemberValidationRequest,
    ): CancelablePromise<PatchMemberValidationRequest> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/member_validation/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this member validation request.
     * @returns void
     * @throws ApiError
     */
    public static memberValidationDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/member_validation/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
