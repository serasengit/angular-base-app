export interface DocumentState {
    id: number;
    code: string;
    description: string;
}

export enum DocumentStateDescription {
    Undefined = 'Indefinido',
    Correct = 'Corregir',
    Review = 'Revisar',
    InternalReport = 'Informe interno',
    ExternalReport = 'Informe externo',
    UrgentReport = 'Informe urgente',
    Inform = 'Informar',
    GuaranteePending = 'Pendiente garantía',
    Inspection = 'Inspección',
    Notify = 'Notificar',
    Finalized = 'Finalizado',
}
