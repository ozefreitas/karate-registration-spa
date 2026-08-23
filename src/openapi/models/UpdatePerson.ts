/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GenderEnum } from './GenderEnum';
import type { GraduationEnum } from './GraduationEnum';
import type { UpdatePersonMemberTypeEnum } from './UpdatePersonMemberTypeEnum';
export type UpdatePerson = {
    readonly id: string;
    readonly age: string;
    member_type?: UpdatePersonMemberTypeEnum;
    profile_image?: string | null;
    first_name: string;
    last_name: string;
    graduation: GraduationEnum;
    birth_date: string;
    address?: string | null;
    post_code?: number | null;
    id_number?: number | null;
    favorite?: boolean;
    registration_date?: string;
    national_card_number?: number | null;
    taxpayer_number?: number | null;
    gender: GenderEnum;
    weight?: number | null;
    quotes_legible?: boolean;
    conditions?: string | null;
    observations?: string | null;
    is_validated?: boolean;
    search_vector?: string | null;
    created_by?: number | null;
    updated_by?: number | null;
};

