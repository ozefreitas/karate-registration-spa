/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MemberTypeEnum } from './MemberTypeEnum';
import type { Persons } from './Persons';
export type MemberShips = {
    readonly id: number;
    person: Persons;
    member_type?: MemberTypeEnum;
    readonly creation_date: string;
    readonly modified_date: string;
};

