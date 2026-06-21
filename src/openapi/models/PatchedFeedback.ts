/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeedbackTypeEnum } from './FeedbackTypeEnum';
export type PatchedFeedback = {
    readonly id?: number;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    feedback_type?: FeedbackTypeEnum;
    feedback?: string;
    readonly club_user?: number | null;
};

