/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactPerson } from './CompactPerson';
import type { CompactTeam } from './CompactTeam';
import type { KataResult } from './KataResult';
import type { KumiteResult } from './KumiteResult';
export type Match = {
    readonly id: number;
    contender_1: CompactPerson;
    contender_2: CompactPerson;
    winner: CompactPerson;
    team_contender_1: CompactTeam;
    team_contender_2: CompactTeam;
    team_winner: CompactTeam;
    readonly kataresult: KataResult | null;
    readonly kumiteresult: KumiteResult | null;
    readonly contender_1_dorsal: string;
    readonly contender_2_dorsal: string;
    readonly team_contender_1_dorsals: string;
    readonly team_contender_2_dorsals: string;
    contender_1_present?: boolean;
    contender_2_present?: boolean;
    round_number: number;
    is_third_place?: boolean;
    match_number: number;
    team_contender_1_present?: boolean;
    team_contender_2_present?: boolean;
    ongoing?: boolean;
    readonly created_at: string;
    bracket: number;
    loser_goes_to?: number | null;
    feeds_into_scoring?: number | null;
};

