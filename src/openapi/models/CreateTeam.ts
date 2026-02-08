/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
export type CreateTeam = {
    readonly id: string;
    chosen_category?: string;
    gender: GenderEnum;
    readonly creation_date: string;
    readonly modified_date: string;
    athlete1: string;
    athlete2: string;
    athlete3?: string | null;
    athlete4?: string | null;
    athlete5?: string | null;
};

