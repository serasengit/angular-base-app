export enum ModuleLink {
    Home = '',
    Dashboard = 'dashboard',
}

export enum ModuleCode {
    Dashboard = 'dashboard',
}

export interface Module {
    id: number;
    parentId?: number;
    code: string;
    description: string;
    link: ModuleLink | string;
    icon: string;
    order: number;
    modules?: Module[];
}
