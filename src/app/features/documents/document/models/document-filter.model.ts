import { DocumentState } from '@features/documents/document/models/document-state.model';
import { DocumentType } from '@features/documents/document/models/document-type.model';
import { Group } from '@features/group/models/group-model';

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
