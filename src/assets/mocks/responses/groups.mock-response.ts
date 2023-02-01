import { Group } from '@features/groups/models/group-model';

export const GROUPS_MOCK_RESPONSE: Group[] = [
    {
        id: 457,
        code: 'AEX',
        description: 'Área de Explotación',
        groups: [
            {
                id: 468,
                code: 'AEX',
                description: 'Área de Explotación',
            },
            {
                id: 469,
                code: 'CIR',
                description: 'Circular',
            },
            {
                id: 470,
                code: 'MOD',
                description: 'Documentos modelo',
            },
            {
                id: 471,
                code: 'NOR',
                description: 'Normativa',
            },
            {
                id: 472,
                code: 'OPH',
                description: 'Oficina de Planificación Hidrológica',
            },
            {
                id: 473,
                code: 'SAIH',
                description: 'Sistema Automático de Información Hidrológica',
            },
            {
                id: 474,
                code: 'ZOR',
                description: 'Zona Oficial de Riego',
            },
        ],
    },
    {
        id: 460,
        code: 'PO2',
        description: 'Proyectos y Obras Zona Occidental',
        groups: [
            {
                id: 508,
                code: 'AB2',
                description: 'Abastecimiento Zona Occidental',
            },
            {
                id: 509,
                code: 'CT2',
                description: 'Carreteras Zona Occidental',
            },
            {
                id: 510,
                code: 'GE2',
                description: 'Doc. Genérica Zona Occidental',
            },
            {
                id: 511,
                code: 'OT2',
                description: 'Otros Zona Occidental',
            },
            {
                id: 512,
                code: 'SD2',
                description: 'Saneamiento y Depuración Zona Occidental',
            },
        ],
    },
];
