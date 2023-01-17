import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DocumentState } from '@features/documents/document/store/reducers/document.reducer';

export const selectDocument = createFeatureSelector<DocumentState>('document');

export const getDocumentTypes = createSelector(selectDocument, (state) => state.filter?.documentTypes);

export const getDocumentStates = createSelector(selectDocument, (state) => state.filter?.documentStates);

export const getGroups = createSelector(selectDocument, (state) => state.filter?.groups);

export const getFilter = createSelector(selectDocument, (state) => state.filter);

export const hasError = createSelector(selectDocument, (state) => state.hasError);
