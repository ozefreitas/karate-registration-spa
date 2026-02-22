/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
import type { Users } from './Users';
export type PatchedPersons = {
    readonly id?: string;
    readonly full_name?: string;
    gender?: GenderEnum;
    updated_by?: Users;
    readonly age?: string;
    readonly current_month_payment_status?: string;
    readonly past_month_payment_status?: string;
    readonly request_status?: string;
    readonly exam_request_status?: string;
    is_validated?: boolean;
    readonly member_types?: Array<string>;
};

