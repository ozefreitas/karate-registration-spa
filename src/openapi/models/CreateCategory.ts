/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { GenderEnum } from './GenderEnum';
import type { GraduationEnum } from './GraduationEnum';
export type CreateCategory = {
    readonly id: number;
    name: string;
    min_age?: number | null;
    max_age?: number | null;
    min_grad?: GraduationEnum | null;
    max_grad?: GraduationEnum | null;
    min_weight?: number | null;
    max_weight?: number | null;
    gender: GenderEnum;
    max_athletes?: number | null;
    readonly creation_date: string;
};
