/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentObjectEnum } from './PaymentObjectEnum';
import type { Type736Enum } from './Type736Enum';
export type AllUsersNotifications = {
    readonly id: number;
    notification: string;
    type?: Type736Enum;
    request_acount?: string | null;
    payment_object?: PaymentObjectEnum;
    can_remove?: boolean;
    readonly created_at: string;
    target_event?: string | null;
    target_member?: string | null;
};

