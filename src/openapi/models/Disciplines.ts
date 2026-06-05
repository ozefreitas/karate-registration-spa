/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from './Category';
import type { DisciplineMember } from './DisciplineMember';
export type Disciplines = {
    readonly id: number;
    readonly individuals: Array<DisciplineMember>;
    readonly teams: string;
    categories: Array<Category>;
    name: string;
    is_team?: boolean;
    is_coach?: boolean;
    event: string;
};

