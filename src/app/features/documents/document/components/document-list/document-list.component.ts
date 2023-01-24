import { Component } from '@angular/core';
import { DataSourceBase } from '@shared/components/data-source/data-source.base';
import { CustomDateFormat } from '@shared/pipes/local-date.pipe';
import { Document } from '../../models/document.model';

interface DocumentRow {
    startDate: Date;
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
})
export class DocumentListComponent extends DataSourceBase<Document, DocumentRow> {
    readonly DocumentColumn = DocumentColumn;
    readonly CustomDateFormat = CustomDateFormat;

    protected getRow(document: Document): DocumentRow {
        return {
            startDate: document.startTime,
            reference: `${document.group.parent.code} - ${document.group.code} - ${document.code}`,
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
