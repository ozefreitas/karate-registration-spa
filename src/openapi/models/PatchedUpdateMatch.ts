/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { KataResult } from './KataResult';
export type PatchedUpdateMatch = {
    readonly id?: number;
    kataresult?: KataResult;
    is_third_place?: boolean;
    ongoing?: boolean;
    readonly created_at?: string;
    contender_1?: string | null;
    contender_2?: string | null;
    loser_goes_to?: number | null;
    feeds_into_scoring?: number | null;
    winner?: string | null;
};
