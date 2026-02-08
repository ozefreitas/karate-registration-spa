/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
import type { MaxGradEnum } from './MaxGradEnum';
import type { MinGradEnum } from './MinGradEnum';
export type CreateCategory = {
    readonly id: number;
    name: string;
    min_age?: number | null;
    max_age?: number | null;
    min_grad?: MinGradEnum | null;
    max_grad?: MaxGradEnum | null;
    min_weight?: number | null;
    max_weight?: number | null;
    gender: GenderEnum;
    max_athletes?: number | null;
    readonly creation_date: string;
};

