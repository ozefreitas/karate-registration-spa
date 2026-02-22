/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
import type { GraduationEnum } from './GraduationEnum';
export type CompactPerson = {
    readonly id: string;
    gender: GenderEnum;
    readonly club: string;
    readonly full_name: string;
    readonly age: string;
    weight?: number | null;
    graduation: GraduationEnum;
};

