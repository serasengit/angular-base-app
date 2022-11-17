import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum MessageType {
    Informative,
    Warning,
    Error,
}

export interface MessageDialogData {
    type: MessageType;
    title: string;
    messages?: string[];
}
@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent {
    public readonly MessageType = MessageType;
    constructor(
        readonly dg: MatDialogRef<MessageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) readonly data: MessageDialogData
    ) {}
}
