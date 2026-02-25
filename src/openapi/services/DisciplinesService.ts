/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCategory } from '../models/AddCategory';
import type { AddDisciplineMember } from '../models/AddDisciplineMember';
import type { CreateDiscipline } from '../models/CreateDiscipline';
import type { CreateTeam } from '../models/CreateTeam';
import type { DeleteMember } from '../models/DeleteMember';
import type { DeleteTeam } from '../models/DeleteTeam';
import type { Disciplines } from '../models/Disciplines';
import type { PaginatedDisciplinesList } from '../models/PaginatedDisciplinesList';
import type { PatchedAddCategory } from '../models/PatchedAddCategory';
import type { PatchedDisciplines } from '../models/PatchedDisciplines';
import type { UpdateDiscipline } from '../models/UpdateDiscipline';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DisciplinesService {
    /**
     * @param eventDisciplines
     * @param isCoach
     * @param isTeam
     * @param page A page number within the paginated result set.
     * @param pageSize Number of results to return per page.
     * @param restricted
     * @returns PaginatedDisciplinesList
     * @throws ApiError
     */
    public static disciplinesList(
        eventDisciplines?: string,
        isCoach?: boolean,
        isTeam?: boolean,
        page?: number,
        pageSize?: number,
        restricted?: boolean,
    ): CancelablePromise<PaginatedDisciplinesList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/disciplines/',
            query: {
                'event_disciplines': eventDisciplines,
                'is_coach': isCoach,
                'is_team': isTeam,
                'page': page,
                'page_size': pageSize,
                'restricted': restricted,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CreateDiscipline
     * @throws ApiError
     */
    public static disciplinesCreate(
        requestBody: CreateDiscipline,
    ): CancelablePromise<CreateDiscipline> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/disciplines/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @returns Disciplines
     * @throws ApiError
     */
    public static disciplinesRetrieve(
        id: number,
    ): CancelablePromise<Disciplines> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/disciplines/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns UpdateDiscipline
     * @throws ApiError
     */
    public static disciplinesUpdate(
        id: number,
        requestBody: UpdateDiscipline,
    ): CancelablePromise<UpdateDiscipline> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/disciplines/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns Disciplines
     * @throws ApiError
     */
    public static disciplinesPartialUpdate(
        id: number,
        requestBody?: PatchedDisciplines,
    ): CancelablePromise<Disciplines> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/disciplines/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @returns void
     * @throws ApiError
     */
    public static disciplinesDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/disciplines/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Adiciona múltiplos Escalões (Categories) a uma Modalidade (Discipline) dentro de um Evento.
     *
     * - Recebe uma lista de IDs de Escalões
     * - Adiciona todos numa única operação
     * - Não remove Escalões já associados
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns AddCategory
     * @throws ApiError
     */
    public static disciplinesAddCategoriesPartialUpdate(
        id: number,
        requestBody?: PatchedAddCategory,
    ): CancelablePromise<AddCategory> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/disciplines/{id}/add_categories/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns AddDisciplineMember
     * @throws ApiError
     */
    public static disciplinesAddMemberCreate(
        id: number,
        requestBody: AddDisciplineMember,
    ): CancelablePromise<AddDisciplineMember> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/disciplines/{id}/add_member/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns CreateTeam
     * @throws ApiError
     */
    public static disciplinesAddTeamCreate(
        id: number,
        requestBody: CreateTeam,
    ): CancelablePromise<CreateTeam> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/disciplines/{id}/add_team/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @returns void
     * @throws ApiError
     */
    public static disciplinesDeleteAllIndividualsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/disciplines/{id}/delete_all_individuals/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @returns void
     * @throws ApiError
     */
    public static disciplinesDeleteAllTeamsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/disciplines/{id}/delete_all_teams/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns AddCategory
     * @throws ApiError
     */
    public static disciplinesDeleteCategoryCreate(
        id: number,
        requestBody: AddCategory,
    ): CancelablePromise<AddCategory> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/disciplines/{id}/delete_category/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns DeleteMember
     * @throws ApiError
     */
    public static disciplinesDeleteMemberCreate(
        id: number,
        requestBody: DeleteMember,
    ): CancelablePromise<DeleteMember> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/disciplines/{id}/delete_member/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this discipline.
     * @param requestBody
     * @returns DeleteTeam
     * @throws ApiError
     */
    public static disciplinesDeleteTeamCreate(
        id: number,
        requestBody: DeleteTeam,
    ): CancelablePromise<DeleteTeam> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/disciplines/{id}/delete_team/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
