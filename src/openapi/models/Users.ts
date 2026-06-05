/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

import type { RoleEnum } from './RoleEnum';
import type { TierEnum } from './TierEnum';
export type Users = {
    readonly id: number;
    /**
     * Obrigatório. 150 carateres ou menos. Apenas letras, dígitos @/./+/-/_.
     */
    username: string;
    role?: RoleEnum;
    tier?: TierEnum;
    email?: string;
};
