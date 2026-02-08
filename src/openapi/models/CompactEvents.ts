/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SeasonEnum } from './SeasonEnum';
export type CompactEvents = {
    id?: string;
    name: string;
    event_date: string;
    season: SeasonEnum;
    location: string;
    has_registrations?: boolean;
    readonly is_open: string;
    readonly is_closed: string;
    readonly is_retification: string;
    readonly number_registrations: string;
    readonly has_any_team: string;
};

