/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

export type UpdateDiscipline = {
    name: string;
    is_team?: boolean;
    is_coach?: boolean;
    event: string;
    readonly individuals: Array<string>;
    readonly teams: Array<string>;
    categories?: Array<number>;
};
