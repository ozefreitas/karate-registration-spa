/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDetail } from '../models/UserDetail';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MeService {
    /**
     * @returns UserDetail
     * @throws ApiError
     */
    public static meRetrieve(): CancelablePromise<UserDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me/',
        });
    }
}
