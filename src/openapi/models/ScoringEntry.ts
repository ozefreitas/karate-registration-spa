/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactPerson } from './CompactPerson';
import type { CompactTeam } from './CompactTeam';
import type { ScoringResult } from './ScoringResult';
export type ScoringEntry = {
    readonly id: number;
    person: CompactPerson;
    team: CompactTeam;
    readonly scoring_result: ScoringResult | null;
    readonly person_dorsal: string;
    score?: string | null;
    rank?: number | null;
    entry_number: number;
    ongoing?: boolean;
    readonly created_at: string;
    scoring_round: number;
};

