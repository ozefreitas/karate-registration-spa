/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { CompactCategory } from './CompactCategory';
import type { DrawTypeEnum } from './DrawTypeEnum';
export type PatchedBracket = {
    readonly id?: number;
    category?: CompactCategory;
    name?: string;
    draw_type?: DrawTypeEnum | null;
    readonly created_at?: string;
    officialized_at?: string | null;
    event?: string;
    discipline?: number;
};
