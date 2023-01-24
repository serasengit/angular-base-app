import { Promoter } from '@features/documents/promoter/models/promoter-model';
import { Group } from '@features/group/models/group-model';
import { DocumentState } from './document-state.model';
import { DocumentType } from './document-type.model';

export interface Document {
    id: number;
    type: DocumentType;
    group: Group;
    state: DocumentState;
    promoter: Promoter;
    code: string;
    subject: string;
    sref: string;
    observations: string;
    keywords: string;
    startTime: Date;
    endTime: Date;
}
