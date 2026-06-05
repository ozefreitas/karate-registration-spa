/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { Users } from './Users';
export type ClubSubscriptions = {
    readonly id: number;
    club: Users;
    year: number;
    amount: string;
    due_date: string;
    paid?: boolean;
    paid_at?: string | null;
};
