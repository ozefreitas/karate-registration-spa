/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { GenderEnum } from './GenderEnum';
import type { GraduationEnum } from './GraduationEnum';
export type NotAdminLikeTypePersons = {
    readonly id: string;
    readonly full_name: string;
    readonly age: string;
    readonly monthly_payment_status: string;
    readonly monthly_payment_config: string;
    readonly next_prev: {
        prev?: string | null;
        next?: string | null;
    };
    readonly member_types: Array<string>;
    readonly exam_request_status: string;
    readonly classifications: string;
    profile_image?: string | null;
    first_name: string;
    last_name: string;
    graduation: GraduationEnum;
    birth_date: string;
    address?: string | null;
    post_code?: number | null;
    id_number?: number | null;
    registration_date?: string;
    national_card_number?: number | null;
    taxpayer_number?: number | null;
    gender: GenderEnum;
    weight?: number | null;
    quotes_legible?: boolean;
    conditions?: string | null;
    observations?: string | null;
    is_validated?: boolean;
};
