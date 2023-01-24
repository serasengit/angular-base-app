import {
    fetchDocumentsSuccess,
    fetchDocumentStatesFailure,
    fetchDocumentStatesSuccess,
    fetchDocumentTypesFailure,
    fetchDocumentTypesSuccess,
    fetchGroupsFailure,
    fetchGroupsSuccess,
    purge,
    setFilter,
} from '@features/documents/document/store/actions/document.actions';
import { createReducer, on } from '@ngrx/store';
import { DocumentFilter } from '../../models/document-filter.model';
import { Document } from '../../models/document.model';

export interface DocumentState {
    filter: DocumentFilter;
    documents: Document[];
    hasError: boolean;
}

const initialState: DocumentState = {
    filter: null,
    documents: null,
    hasError: false,
};

export const documentReducer = createReducer(
    initialState,
    on(setFilter, (state, action) => ({
        ...state,
        filter: {
            ...state.filter,
            group: action.filter.group,
            subGroup: action.filter.subGroup,
            documentType: action.filter.documentType,
            documentState: action.filter.documentState,
            startDate: action.filter.startDate,
            endDate: action.filter.endDate,
        },
    })),
    on(fetchDocumentTypesSuccess, (state, action) => ({
        ...state,
        filter: {
            ...state.filter,
            documentTypes: action.documentTypes,
        },
    })),
    on(fetchDocumentStatesSuccess, (state, action) => ({
        ...state,
        filter: {
            ...state.filter,
            documentStates: action.documentStates,
        },
    })),
    on(fetchGroupsSuccess, (state, action) => ({
        ...state,
        filter: {
            ...state.filter,
            groups: action.groups,
        },
    })),
    on(fetchDocumentsSuccess, (state, action) => ({
        ...state,
        documents: action.documents,
    })),
    on(fetchGroupsFailure, fetchDocumentStatesFailure, fetchDocumentTypesFailure, (state, action) => ({
        ...state,
        hasError: !!action.error,
    })),
    on(purge, () => ({
        ...initialState,
    }))
);
