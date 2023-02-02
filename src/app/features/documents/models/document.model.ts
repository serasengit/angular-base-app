import { Group } from '@features/groups/models/group-model';
import { Promoter } from '@features/promoters/models/promoter-model';
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
