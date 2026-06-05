/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

export type CreateMatch = {
    readonly id: number;
    round_number: number;
    is_third_place?: boolean;
    match_number: number;
    ongoing?: boolean;
    readonly created_at: string;
    bracket: number;
    contender_1?: string | null;
    contender_2?: string | null;
    loser_goes_to?: number | null;
    feeds_into_scoring?: number | null;
    winner?: string | null;
};
