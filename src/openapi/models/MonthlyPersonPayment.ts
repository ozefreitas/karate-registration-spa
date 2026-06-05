/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactPerson } from './CompactPerson';
export type MonthlyPersonPayment = {
    readonly id: number;
    readonly inside_limit: string;
    readonly predefined_amount: string;
    readonly is_custom: string;
    person: CompactPerson;
    year: number;
    month: number;
    amount: string;
    due_date?: string | null;
    paid?: boolean;
    paid_at?: string | null;
};

