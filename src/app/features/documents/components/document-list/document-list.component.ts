import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataSourceBase } from '@shared/components/datasource/data-source.base';
import { CustomDateFormat } from '@shared/pipes/local-date.pipe';
import { Document } from '../../models/document.model';

interface DocumentRow {
    id: number;
    startDate: Date;
    group: string;
    reference: string;
    subject: string;
    sref: string;
    promoter: string;
    observations: string;
    keywords: string;
    state: string;
}

enum DocumentColumn {
    StartDate = 'startDate',
    Group = 'group',
    Reference = 'reference',
    Subject = 'subject',
    Sref = 'sref',
    Promoter = 'promoter',
    Observations = 'observations',
    Keywords = 'keywords',
    State = 'state',
}

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent extends DataSourceBase<Document, DocumentRow> {
    readonly DocumentColumn = DocumentColumn;
    readonly CustomDateFormat = CustomDateFormat;

    protected getRow(document: Document): DocumentRow {
        return {
            id: document.id,
            startDate: document.startTime,
            group: document.group.parent.code,
            reference: `${document.group.code} -  ${document.type.code} - ${document.code}`,
            subject: document.subject,
            sref: document.sref,
            promoter: document.promoter?.fullName,
            observations: document.observations,
            keywords: document.keywords,
            state: document.state.description,
        };
    }

    get displayedColumns(): DocumentColumn[] {
        return [
            DocumentColumn.StartDate,
            DocumentColumn.Group,
            DocumentColumn.Reference,
            DocumentColumn.Subject,
            DocumentColumn.Sref,
            DocumentColumn.Promoter,
            DocumentColumn.Observations,
            DocumentColumn.Keywords,
            DocumentColumn.State,
        ];
    }
}
