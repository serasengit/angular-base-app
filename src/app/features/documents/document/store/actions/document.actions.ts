import { Group } from '@features/group/models/group-model';
import { createAction, props } from '@ngrx/store';
import { DocumentFilter } from '../../models/document-filter.model';
import { DocumentState } from '../../models/document-state.model';
import { DocumentType } from '../../models/document-type.model';
import { Document } from '../../models/document.model';

export const fetchDocumentTypes = createAction('[Document] Fetch Document Types');

export const fetchDocumentTypesSuccess = createAction(
    '[Document API] Fetch Document Types Success',
    props<{ readonly documentTypes: DocumentType[] }>()
);

export const fetchDocumentTypesFailure = createAction('[Document API] Fetch Document Types Failure', props<{ readonly error: any }>());

export const fetchDocumentStates = createAction('[Document] Fetch Document States');

export const fetchDocumentStatesSuccess = createAction(
    '[Document API] Fetch Document States Success',
    props<{ readonly documentStates: DocumentState[] }>()
);

export const fetchDocumentStatesFailure = createAction('[Document API] Fetch Document States Failure', props<{ readonly error: any }>());

export const fetchGroups = createAction('[Document] Fetch Groups', props<{ withSubGroups?: boolean }>());

export const fetchGroupsSuccess = createAction('[Document API] Fetch Groups Success', props<{ readonly groups: Group[] }>());

export const fetchGroupsFailure = createAction('[Document API] Fetch Groups Failure', props<{ readonly error: any }>());

export const setFilter = createAction('[Document] Set Filter', props<{ readonly filter: DocumentFilter }>());

export const fetchDocuments = createAction('[Document] Fetch Documents', props<{ readonly filter?: DocumentFilter }>());

export const fetchDocumentsSuccess = createAction('[Document API] Fetch Documents Success', props<{ readonly documents: Document[] }>());

export const fetchDocumentsFailure = createAction('[Document API] Fetch Documents Failure', props<{ readonly error: any }>());

export const fetchDocument = createAction('[Document] Fetch Document', props<{ readonly id: number }>());

export const fetchDocumentSuccess = createAction('[Document API] Fetch Document Success', props<{ readonly document: Document }>());

export const fetchDocumentFailure = createAction('[Document API] Fetch Document Failure', props<{ readonly error: any }>());

export const clearDocument = createAction('[Document] Clear Document');

export const purge = createAction('[Document] Purge');
