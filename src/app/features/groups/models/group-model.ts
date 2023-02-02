export interface Group {
    id: number;
    code: string;
    description: string;
    parent?: Group;
    groups?: Group[];
}
