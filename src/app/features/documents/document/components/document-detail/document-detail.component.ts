import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeviceType } from '@app/app.component';

import { Document } from '../../models/document.model';

@Component({
    selector: 'app-document-detail',
    templateUrl: './document-detail.component.html',
    styleUrls: ['./document-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentDetailComponent implements OnInit {
    @Input() deviceType: DeviceType;
    @Input() document: Document;
    @Output() readonly onClose = new EventEmitter<void>();

    readonly DeviceType = DeviceType;

    constructor() {}

    ngOnInit(): void {}
}
