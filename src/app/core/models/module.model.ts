export enum ModuleLink {
    Home = '',
    Documents = 'documents',
}

export enum ModuleCode {
    Documents = 'documents',
}

export interface Module {
    parentId?: number;
    code: ModuleCode;
    link?: ModuleLink | string;
    icon: string;
    modules?: Module[];
}
