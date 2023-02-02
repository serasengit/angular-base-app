import { Group } from '@features/groups/models/group-model';
import { createAction, props } from '@ngrx/store';
import { DocumentFilter } from '../../models/document-filter.model';
import { DocumentState } from '../../models/document-state.model';
import { DocumentType } from '../../models/document-type.model';
import { Document } from '../../models/document.model';

export const fetchDocumentTypes = createAction('[Documents] Fetch Document Types');

export const fetchDocumentTypesSuccess = createAction(
    '[Document Types API] Fetch Document Types Success',
    props<{ readonly documentTypes: DocumentType[] }>()
);

export const fetchDocumentTypesFailure = createAction(
    '[Document Types API] Fetch Document Types Failure',
    props<{ readonly error: any }>()
);

export const fetchDocumentStates = createAction('[Documents] Fetch Document States');

export const fetchDocumentStatesSuccess = createAction(
    '[Document States API] Fetch Document States Success',
    props<{ readonly documentStates: DocumentState[] }>()
);

export const fetchDocumentStatesFailure = createAction(
    '[Document States API] Fetch Document States Failure',
    props<{ readonly error: any }>()
);

export const fetchGroups = createAction('[Documents] Fetch Groups', props<{ withSubGroups?: boolean }>());

export const fetchGroupsSuccess = createAction('[Document Groups API] Fetch Groups Success', props<{ readonly groups: Group[] }>());

export const fetchGroupsFailure = createAction('[Document Groups API] Fetch Groups Failure', props<{ readonly error: any }>());

export const fetchDocuments = createAction('[Documents] Fetch Documents', props<{ readonly filter?: DocumentFilter }>());

export const fetchDocumentsSuccess = createAction('[Documents API] Fetch Documents Success', props<{ readonly documents: Document[] }>());

export const fetchDocumentsFailure = createAction('[Documents API] Fetch Documents Failure', props<{ readonly error: any }>());

export const fetchDocument = createAction('[Documents] Fetch Document', props<{ readonly id: number }>());

export const fetchDocumentSuccess = createAction('[Documents API] Fetch Document Success', props<{ readonly document: Document }>());

export const fetchDocumentFailure = createAction('[Documents API] Fetch Document Failure', props<{ readonly error: any }>());

export const setFilter = createAction('[Documents] Set Filter', props<{ readonly filter: DocumentFilter }>());

export const clearDocument = createAction('[Documents] Clear Document');

export const purge = createAction('[Documents] Purge');
