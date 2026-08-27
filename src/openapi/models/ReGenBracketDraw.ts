/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ReGenBracketDraw = {
    splitClubs: boolean;
    splitFavourites: boolean;
    /**
     * Lista de IDs dos Membros/Equipas a serem removidos da bracket corrente
     */
    removed_ids?: Array<string>;
    /**
     * Lista de IDs dos Membros/Equipas a serem adicionados à bracket corrente
     */
    added_ids?: Array<string>;
    maxMembersPerGroup?: string;
    minMembersPerGroup?: string;
    finalsSize?: string;
};

