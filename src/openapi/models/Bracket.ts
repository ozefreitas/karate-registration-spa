/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactCategory } from './CompactCategory';
import type { DrawTypeEnum } from './DrawTypeEnum';
export type Bracket = {
    readonly id: number;
    category: CompactCategory;
    readonly is_team: string;
    readonly has_only_scoring_rounds: string;
    name: string;
    draw_type?: DrawTypeEnum | null;
    readonly created_at: string;
    officialized_at?: string | null;
    event: string;
    discipline: number;
};

