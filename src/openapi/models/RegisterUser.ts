/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */

/**
 * Will check for the tohen authenticity, expiration and usage before creating an user acount
 */
export type RegisterUser = {
    first_name?: string;
    last_name?: string;
    email?: string;
    /**
     * Obrigatório. 150 carateres ou menos. Apenas letras, dígitos @/./+/-/_.
     */
    username: string;
    password: string;
    token: string;
};
