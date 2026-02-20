/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactMembers } from './CompactMembers';
export type MonthlyMemberPayment = {
    readonly id: number;
    readonly inside_limit: string;
    readonly predefined_amount: string;
    readonly is_custom: string;
    person: CompactMembers;
    year: number;
    month: number;
    amount: string;
    due_date?: string | null;
    paid?: boolean;
    paid_at?: string | null;
};

