import { Group } from '@features/group/models/group-model';
import { DocumentState } from './document-state.model';
import { DocumentType } from './document-type.model';

export interface DocumentFilter {
    groups: Group[];
    group: Group;
    subGroup: Group;
    documentTypes: DocumentType[];
    documentType: DocumentType;
    documentStates: DocumentState[];
    documentState: DocumentState;
    startDate: Date;
    endDate: Date;
}
