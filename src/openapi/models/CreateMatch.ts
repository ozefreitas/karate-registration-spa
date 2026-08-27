/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateMatch = {
    readonly id: number;
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
    contender_1?: string | null;
    contender_2?: string | null;
    winner?: string | null;
    loser_goes_to?: number | null;
    feeds_into_scoring?: number | null;
    team_contender_1?: string | null;
    team_contender_2?: string | null;
    team_winner?: string | null;
};

