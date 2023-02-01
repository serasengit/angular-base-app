import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceType } from '@app/app.component';

import { Document } from '../../models/document.model';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent {
    @Input() deviceType: DeviceType;
    @Input() document: Document;
    @Output() readonly onClose = new EventEmitter<void>();
}
