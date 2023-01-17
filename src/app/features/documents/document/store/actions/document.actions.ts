import { DocumentState } from '@features/documents/document/models/document-state.model';
import { DocumentType } from '@features/documents/document/models/document-type.model';
import { Group } from '@features/group/models/group-model';
import { createAction, props } from '@ngrx/store';
import { DocumentFilter } from '../../models/document-filter.model';

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

export const fetchDocuments = createAction('[Document] Fetch Documents', props<{ readonly filter: DocumentFilter }>());

export const fetchDocumentsSuccess = createAction('[Document API] Fetch Documents Success', props<{ readonly documents: Document[] }>());

export const fetchDocumentsFailure = createAction('[Document API] Fetch Documents Failure', props<{ readonly error: any }>());

export const purge = createAction('[Document] Purge');
