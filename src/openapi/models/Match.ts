/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactPerson } from './CompactPerson';
import type { KataResult } from './KataResult';
import type { KumiteResult } from './KumiteResult';
export type Match = {
    readonly id: number;
    contender_1: CompactPerson;
    contender_2: CompactPerson;
    winner: CompactPerson;
    readonly kataresult: KataResult | null;
    readonly kumiteresult: KumiteResult | null;
    round_number: number;
    is_third_place?: boolean;
    match_number: number;
    ongoing?: boolean;
    readonly created_at: string;
    bracket: number;
    loser_goes_to?: number | null;
    feeds_into_scoring?: number | null;
    team_contender_1?: string | null;
    team_contender_2?: string | null;
    team_winner?: string | null;
};

