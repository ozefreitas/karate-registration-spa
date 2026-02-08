/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
import type { MemberTypeEnum } from './MemberTypeEnum';
import type { Users } from './Users';
export type Members = {
    readonly id: string;
    readonly full_name: string;
    gender: GenderEnum;
    updated_by: Users;
    readonly age: string;
    member_type?: MemberTypeEnum;
    readonly current_month_payment_status: string;
    readonly past_month_payment_status: string;
    readonly request_status: string;
    is_validated?: boolean;
    weight?: number | null;
};

