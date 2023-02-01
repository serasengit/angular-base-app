import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomDateFormat, LocalDatePipe } from '@shared/pipes/local-date.pipe';

import { Document } from '../../../../models/document.model';

@Component({
    selector: 'app-document-detail',
    templateUrl: './document-detail.component.html',
    styleUrls: ['./document-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailComponent {
    @Input() document: Document;
    readonly CustomDateFormat = CustomDateFormat;

    constructor(readonly localDatePipe: LocalDatePipe) {}
}
