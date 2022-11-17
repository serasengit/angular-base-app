// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment, EnvironmentType } from '@core/models/environment.model';

export const environment: Environment = {
    type: EnvironmentType.Development,
    production: false,
    API: {
        prefix: '/api',
        version: 'v1',
        url: 'http://localhost:3000',
    },
};
