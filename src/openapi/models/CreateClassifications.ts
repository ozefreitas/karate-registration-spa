/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlaceEnum } from './PlaceEnum';
export type CreateClassifications = {
    readonly id: number;
    place: PlaceEnum;
    readonly created_at: string;
    bracket: number;
    person?: string | null;
    team?: string | null;
};

