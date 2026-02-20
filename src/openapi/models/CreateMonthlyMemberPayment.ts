/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateMonthlyMemberPayment = {
    readonly id: number;
    readonly amount: string;
    customAmount?: string;
    plan?: string;
    is_default?: boolean;
    year: number;
    month: number;
    person: string;
};

