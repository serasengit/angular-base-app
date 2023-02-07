import { Document } from '@features/documents/models/document.model';

export const DOCUMENT_MOCK_RESPONSE: Document = {
    id: 2018,
    type: {
        id: 261,
        code: 'AT',
        description: 'Archivo Técnico',
    },
    group: {
        id: 516,
        code: 'CAM',
        description: 'Presa de Campos del Paraíso',
        parent: {
            id: 462,
            code: 'Z12',
            description: 'Servicio de Explotación Zonas 1ª y 2ª',
            parent: null,
        },
    },
    state: {
        id: 3,
        code: 'REV',
        description: 'Revisar',
    },
    promoter: {
        id: 13366,
        fullName: 'Juan Sereno Martínez',
        NIF: '',
        CIF: '',
        phone: '',
        email: '',
        contactName: '',
        address: '',
    },
    code: 'IPEcopia',
    subject: '***COPIA*** A.T. Presa de Campos del Paraíso. Implantación Plan de Emergencia',
    sref: '',
    observations: '',
    keywords: 'Presa de Campos del Paraíso',
    startTime: new Date('2021-10-15T14:06:27.000Z'),
    endTime: null,
};
