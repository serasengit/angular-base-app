import { Module } from '@core/models/module.model';
import { createAction, props } from '@ngrx/store';
import { DeviceType, Language } from 'src/app/app.component';

export const setDeviceType = createAction('[App] Set Device Type', props<{ deviceType: DeviceType }>());

export const showSpinner = createAction('[App] Show spinner');

export const hideSpinner = createAction('[App] Hide spinner');

export const setLanguage = createAction('[App] Set language', props<{ language: Language }>());

export const setModule = createAction('[App] Set Module', props<{ module: Module }>());

export const purge = createAction('[App] Purge');
