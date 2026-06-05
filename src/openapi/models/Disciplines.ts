/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { Category } from './Category';
export type Disciplines = {
    readonly id: number;
    readonly individuals: string;
    readonly teams: string;
    categories: Array<Category>;
    name: string;
    is_team?: boolean;
    is_coach?: boolean;
    event: string;
};
