/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { CompactPerson } from './CompactPerson';
import type { CompactUser } from './CompactUser';
import type { RequestTypeEnum } from './RequestTypeEnum';
import type { StatusDe3Enum } from './StatusDe3Enum';
export type MemberValidationRequest = {
    readonly id: number;
    person: CompactPerson;
    requested_by: CompactUser;
    readonly member_birth_date: string;
    request_type?: RequestTypeEnum;
    status?: StatusDe3Enum;
    message?: string;
    admin_comment?: string;
    file?: string | null;
    readonly created_at: string;
    reviewed_at?: string | null;
};
