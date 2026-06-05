/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

export type CreateDiscipline = {
    readonly id: number;
    name: string;
    is_team?: boolean;
    is_coach?: boolean;
    event: string;
    categories?: Array<number>;
};
