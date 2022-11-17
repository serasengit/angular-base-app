import { DEFAULT_LANGUAGE, DeviceType } from '@app/app.component';

import { AppState } from '../reducers/app.reducers';
import { getDeviceType, getLanguage, showSpinner } from './app.selectors';

describe('App: Selector', () => {
  const state: AppState = {
    deviceType: DeviceType.Small,
    showSpinner: false,
    language: DEFAULT_LANGUAGE,
    module: null,
  };

  it('should select deviceType', () => {
    expect(getDeviceType.projector(state)).toBe(DeviceType.Small);
  });

  it('should select showSpinner', () => {
    expect(showSpinner.projector(state)).toEqual(false);
  });

  it('should select language', () => {
    expect(getLanguage.projector(state)).toEqual(DEFAULT_LANGUAGE);
  });
});
