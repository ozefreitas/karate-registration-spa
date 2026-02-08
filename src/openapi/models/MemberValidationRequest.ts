/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactMembers } from './CompactMembers';
import type { CompactUser } from './CompactUser';
import type { StatusEnum } from './StatusEnum';
export type MemberValidationRequest = {
    readonly id: number;
    member: CompactMembers;
    requested_by: CompactUser;
    readonly member_birth_date: string;
    status?: StatusEnum;
    message?: string;
    admin_comment?: string;
    readonly created_at: string;
    reviewed_at?: string | null;
};

