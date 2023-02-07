export enum ModuleLink {
    Home = '',
    Documents = 'documents',
    Contracts = 'contracts',
    Promoters = 'promoters',
}

export enum ModuleCode {
    Documents = 'documents',
    Contracts = 'contracts',
    Promoters = 'promoters',
}

export interface Module {
    parentId?: number;
    code: ModuleCode;
    link?: ModuleLink | string;
    icon: string;
    modules?: Module[];
}
