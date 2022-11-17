import { Environment, EnvironmentType } from '@core/models/environment.model';

export const environment: Environment = {
    type: EnvironmentType.Production,
    production: true,
    API: {
        prefix: '/api',
        version: 'v1',
        url: 'http://chg-gestor-documental',
    },
};
