/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KataResult } from './KataResult';
import type { KumiteResult } from './KumiteResult';
export type UpdateMatch = {
    readonly id: number;
    kataresult?: KataResult;
    kumiteresult?: KumiteResult;
    is_third_place?: boolean;
    ongoing?: boolean;
    readonly created_at: string;
    contender_1?: string | null;
    contender_2?: string | null;
    winner?: string | null;
    loser_goes_to?: number | null;
    feeds_into_scoring?: number | null;
    team_contender_1?: string | null;
    team_contender_2?: string | null;
    team_winner?: string | null;
};

