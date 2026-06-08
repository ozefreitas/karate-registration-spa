/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactPerson } from './CompactPerson';
import type { GenderEnum } from './GenderEnum';
export type CompactTeam = {
    readonly id: string;
    athlete1: CompactPerson;
    athlete2: CompactPerson;
    athlete3: CompactPerson;
    athlete4: CompactPerson;
    athlete5: CompactPerson;
    readonly club: string;
    gender: GenderEnum;
    team_number: number;
};

