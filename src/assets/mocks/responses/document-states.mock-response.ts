import { DocumentState } from '@features/documents/models/document-state.model';

export const DOCUMENT_STATES_MOCK_RESPONSE: DocumentState[] = [
    {
        id: 1,
        code: 'INDF',
        description: 'Indefinido',
    },
    {
        id: 2,
        code: 'CORR',
        description: 'Corregir',
    },
    {
        id: 3,
        code: 'REV',
        description: 'Revisar',
    },
    {
        id: 4,
        code: 'INF-INT',
        description: 'Informe interno',
    },
    {
        id: 5,
        code: 'INF-EXT',
        description: 'Informe externo',
    },
    {
        id: 6,
        code: 'INF-URG',
        description: 'Informe urgente',
    },
    {
        id: 7,
        code: 'INFO',
        description: 'Informar',
    },
    {
        id: 8,
        code: 'PEN-GAR',
        description: 'Pendiente garantía',
    },
    {
        id: 9,
        code: 'INSP',
        description: 'Inspección',
    },
    {
        id: 10,
        code: 'NOT',
        description: 'Notificar',
    },
    {
        id: 11,
        code: 'FIN',
        description: 'Finalizado',
    },
];
