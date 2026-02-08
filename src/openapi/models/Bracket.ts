/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
import type { Type85fEnum } from './Type85fEnum';
export type Bracket = {
    readonly id: number;
    name: string;
    type?: Type85fEnum | null;
    gender: GenderEnum;
    readonly created_at: string;
    discipline: number;
    category: number;
};

