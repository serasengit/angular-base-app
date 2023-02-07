import { DEFAULT_LANGUAGE, DeviceType, getDevice, Language } from '@app/app.component';
import { Module } from '@core/models/module.model';
import { createReducer, on } from '@ngrx/store';
import { setDeviceType, showSpinner, hideSpinner, setLanguage, setModule, purge } from '@app/store/actions/app.actions';

export interface AppState {
    deviceType: DeviceType;
    showSpinner: boolean;
    language: Language;
    module: Module;
}
const initialState: AppState = {
    deviceType: getDevice(window.screen.width),
    showSpinner: false,
    language: DEFAULT_LANGUAGE,
    module: null,
};
export const appReducer = createReducer(
    initialState,
    on(setDeviceType, (state, action) => ({
        ...state,
        deviceType: action.deviceType,
    })),
    on(showSpinner, (state) => ({
        ...state,
        showSpinner: true,
    })),
    on(hideSpinner, (state) => ({
        ...state,
        showSpinner: false,
    })),
    on(setLanguage, (state, action) => ({
        ...state,
        language: action.language,
    })),
    on(setModule, (state, action) => ({
        ...state,
        module: action.module,
    })),
    on(purge, () => ({
        ...initialState,
    }))
);
