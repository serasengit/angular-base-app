import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducers';

export const selectApp = createFeatureSelector<AppState>('app');

export const getDeviceType = createSelector(selectApp, (state) => state.deviceType);

export const showSpinner = createSelector(selectApp, (state) => state.showSpinner);

export const getLanguage = createSelector(selectApp, (state) => state.language);

export const getModuleCode = createSelector(selectApp, (state) => state.module?.code);
