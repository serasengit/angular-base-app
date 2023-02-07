import { Environment, EnvironmentType } from '@core/models/environment.model';

export const environment: Environment = {
    type: EnvironmentType.OpenShiftDev,
    production: false,
    API: {
        prefix: '/api',
        version: 'v1',
        url: 'http://server-chg-gestor-documental-dev.apps.cloud.okd.local',
    },
};
