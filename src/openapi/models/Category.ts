/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
import type { GraduationEnum } from './GraduationEnum';
export type Category = {
    readonly id: number;
    name: string;
    gender: GenderEnum;
    readonly has_age: string;
    readonly has_grad: string;
    readonly has_weight: string;
    min_age?: number | null;
    max_age?: number | null;
    min_grad?: GraduationEnum | null;
    max_grad?: GraduationEnum | null;
    min_weight?: number | null;
    max_weight?: number | null;
    max_athletes?: number | null;
};

