/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactPerson } from './CompactPerson';
export type PatchedScoringEntry = {
    readonly id?: number;
    person?: CompactPerson;
    score?: string | null;
    rank?: number | null;
    entry_number?: number;
    ongoing?: boolean;
    readonly created_at?: string;
    scoring_round?: number;
};

