/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactMembers } from './CompactMembers';
import type { GenderEnum } from './GenderEnum';
import type { NameCategory } from './NameCategory';
export type Teams = {
    readonly id: string;
    athlete1: CompactMembers;
    athlete2: CompactMembers;
    athlete3: CompactMembers;
    athlete4: CompactMembers;
    athlete5: CompactMembers;
    readonly team_size: string;
    category: NameCategory;
    readonly disciplines: string;
    readonly events: string;
    gender: GenderEnum;
    team_number: number;
};

