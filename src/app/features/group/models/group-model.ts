export interface Group {
    id: number;
    code: string;
    description: string;
    groups?: Group[];
}
