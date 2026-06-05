/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScoringResult } from './ScoringResult';
export type UpdateScoringEntry = {
    scoring_result?: ScoringResult;
    score?: string | null;
    rank?: number | null;
    ongoing?: boolean;
    readonly created_at: string;
    person?: string | null;
};

