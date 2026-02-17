/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EncounterTypeEnum } from './EncounterTypeEnum';
import type { SeasonEnum } from './SeasonEnum';
export type PatchedEvents = {
    id?: string;
    readonly individuals?: string;
    readonly is_open?: string;
    readonly is_closed?: string;
    readonly is_retification?: string;
    readonly number_registrations?: string;
    readonly has_any_team?: string;
    readonly has_any_indiv?: string;
    readonly has_coach?: string;
    name?: string;
    location?: string;
    season?: SeasonEnum;
    start_registration?: string | null;
    end_registration?: string | null;
    retifications_deadline?: string | null;
    event_date?: string;
    description?: string | null;
    custody?: string | null;
    email_contact?: string | null;
    contact?: number | null;
    has_ended?: boolean;
    has_registrations?: boolean;
    has_categories?: boolean;
    encounter?: boolean;
    encounter_type?: EncounterTypeEnum | null;
    rating?: number;
    file?: string | null;
};

