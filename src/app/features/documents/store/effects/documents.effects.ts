import { Injectable } from '@angular/core';
import { DocumentStateService } from '@features/documents/services/document-state.service';
import { DocumentTypeService } from '@features/documents/services/document-type.service';
import {
    fetchDocument,
    fetchDocumentFailure,
    fetchDocuments,
    fetchDocumentsFailure,
    fetchDocumentsSuccess,
    fetchDocumentStates,
    fetchDocumentStatesFailure,
    fetchDocumentStatesSuccess,
    fetchDocumentSuccess,
    fetchDocumentTypes,
    fetchDocumentTypesFailure,
    fetchDocumentTypesSuccess,
    fetchGroups,
    fetchGroupsFailure,
    fetchGroupsSuccess,
} from '@features/documents/store/actions/documents.actions';
import { GroupService } from '@features/groups/services/group-service';
import { PromoterService } from '@features/promoters/services/promoter-service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DocumentService } from '../../services/document.service';

@Injectable()
export class DocumentEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly documentTypeService: DocumentTypeService,
        private readonly documentStateService: DocumentStateService,
        private readonly documentService: DocumentService,
        private readonly groupService: GroupService,
        private readonly promoterService: PromoterService
    ) {}

    readonly fetchDocumentTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchDocumentTypes),
            mergeMap(() =>
                this.documentTypeService.findAll().pipe(
                    map((documentTypes) => {
                        return fetchDocumentTypesSuccess({ documentTypes });
                    }),
                    catchError((error) => of(fetchDocumentTypesFailure({ error })))
                )
            )
        )
    );

    readonly fetchDocumentStates$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchDocumentStates),
            mergeMap(() =>
                this.documentStateService.findAll().pipe(
                    map((documentStates) => {
                        return fetchDocumentStatesSuccess({ documentStates });
                    }),
                    catchError((error) => of(fetchDocumentStatesFailure({ error })))
                )
            )
        )
    );

    readonly fetchGroups$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchGroups),
            mergeMap(({ withSubGroups }) =>
                this.groupService.find(withSubGroups).pipe(
                    map((groups) => {
                        return fetchGroupsSuccess({ groups });
                    }),
                    catchError((error) => of(fetchGroupsFailure({ error })))
                )
            )
        )
    );

    readonly fetchDocuments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchDocuments),
            mergeMap(({ filter }) =>
                this.documentService
                    .find(
                        filter?.group?.id,
                        filter?.subGroup?.id,
                        filter?.documentType?.id,
                        filter?.documentState?.id,
                        filter?.startDate,
                        filter?.endDate
                    )
                    .pipe(
                        map((documents) => {
                            return fetchDocumentsSuccess({ documents });
                        }),
                        catchError((error) => of(fetchDocumentsFailure({ error })))
                    )
            )
        )
    );

    readonly fetchDocument$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchDocument),
            mergeMap(({ id }) =>
                this.documentService.findById(id).pipe(
                    map((document) => {
                        return fetchDocumentSuccess({ document });
                    }),
                    catchError((error) => of(fetchDocumentFailure({ error })))
                )
            )
        )
    );
}
