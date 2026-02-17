/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EncounterTypeEnum } from './EncounterTypeEnum';
import type { SeasonEnum } from './SeasonEnum';
export type CreateEvent = {
    id?: string;
    name: string;
    location: string;
    season: SeasonEnum;
    start_registration?: string | null;
    end_registration?: string | null;
    retifications_deadline?: string | null;
    event_date: string;
    description?: string | null;
    custody?: string | null;
    email_contact?: string | null;
    contact?: number | null;
    has_registrations?: boolean;
    has_categories?: boolean;
    encounter?: boolean;
    encounter_type?: EncounterTypeEnum | null;
    file?: string | null;
};

