/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CompactEvents } from './CompactEvents';
import type { PaymentObjectEnum } from './PaymentObjectEnum';
import type { TypeEnum } from './TypeEnum';
export type Notifications = {
    readonly id: number;
    target_event: CompactEvents;
    notification: string;
    type?: TypeEnum;
    request_acount?: string | null;
    payment_object?: PaymentObjectEnum;
    can_remove?: boolean;
    readonly created_at: string;
    target_member?: string | null;
    club_user: number;
};

