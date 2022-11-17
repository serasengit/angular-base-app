export enum EnvironmentType {
    Development = 'dev',
    Production = 'prod',
}

export interface Environment {
    type: EnvironmentType;
    API: API;
    production: boolean;
}

export interface API {
    url: string;
    prefix?: string;
    version?: string;
}
