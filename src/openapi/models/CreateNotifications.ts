/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentObjectEnum } from './PaymentObjectEnum';
import type { TypeEnum } from './TypeEnum';
export type CreateNotifications = {
    readonly id: number;
    notification: string;
    type?: TypeEnum;
    payment_object?: PaymentObjectEnum;
    can_remove?: boolean;
    readonly created_at: string;
    target_event?: string | null;
    target_person?: string | null;
    club_user: number;
};

