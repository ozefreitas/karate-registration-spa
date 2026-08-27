/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DrawTypeEnum } from './DrawTypeEnum';
export type CreateBracket = {
    readonly id: number;
    name: string;
    draw_type?: DrawTypeEnum | null;
    readonly created_at: string;
    officialized_at?: string | null;
    public?: boolean;
    event: string;
    discipline: number;
    category: number;
};

