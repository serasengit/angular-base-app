import { DEFAULT_LANGUAGE, DeviceType, getDevice, Language } from '@app/app.component';
import { hideSpinner, purge, setDeviceType, setLanguage, showSpinner } from '../actions/app.actions';
import { appReducer, AppState } from './app.reducers';

describe('App: Reducer', () => {
  it('should have initial state', () => {
    const expected: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: false,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const action = { type: 'foo' } as any;
    expect(appReducer(undefined, action)).toEqual(expected);
  });
  it('should have a deviceType set to small', () => {
    const initialState: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: false,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const expected: AppState = {
      deviceType: DeviceType.Small,
      showSpinner: false,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const action = setDeviceType({ deviceType: DeviceType.Small });
    const result = appReducer(initialState, action);
    expect(result).toEqual(expected);
  });
  it('should have showSpinner true', () => {
    const initialState: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: false,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const expected: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: true,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const action = showSpinner();
    const result = appReducer(initialState, action);
    expect(result).toEqual(expected);
  });
  it('should have showSpinner false', () => {
    const initialState: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: true,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const expected: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: false,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const action = hideSpinner();
    const result = appReducer(initialState, action);
    expect(result).toEqual(expected);
  });
  it('should have language english', () => {
    const initialState: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: true,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const expected: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: true,
      language: Language.English,
      module: null,
    };
    const action = setLanguage({ language: Language.English });
    const result = appReducer(initialState, action);
    expect(result).toEqual(expected);
  });
  it('should purge', () => {
    const initialState: AppState = {
      deviceType: DeviceType.Small,
      showSpinner: true,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const expected: AppState = {
      deviceType: getDevice(window.screen.width),
      showSpinner: false,
      language: DEFAULT_LANGUAGE,
      module: null,
    };
    const action = purge();
    const result = appReducer(initialState, action);
    expect(result).toEqual(expected);
  });
});
