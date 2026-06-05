/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { CompactPerson } from './CompactPerson';
import type { GenderEnum } from './GenderEnum';
import type { NameCategory } from './NameCategory';
export type Teams = {
    readonly id: string;
    athlete1: CompactPerson;
    athlete2: CompactPerson;
    athlete3: CompactPerson;
    athlete4: CompactPerson;
    athlete5: CompactPerson;
    readonly team_size: string;
    category: NameCategory;
    readonly disciplines: string;
    readonly events: string;
    gender: GenderEnum;
    team_number: number;
};
