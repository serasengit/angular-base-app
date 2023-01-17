import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { MessageDialogComponent } from './components/dialogs/message-dialog/message-dialog.component';

import { MaterialModule } from './material/material.module';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { ReplaceNullPipe } from './pipes/replace-null.pipe';

@NgModule({
    imports: [CommonModule, MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule],
    exports: [MaterialModule, TranslateModule, FormsModule, ReactiveFormsModule, LocalDatePipe, ReplaceNullPipe],
    providers: [TranslateService, TranslateStore, LocalDatePipe, ReplaceNullPipe],
    declarations: [MessageDialogComponent, LocalDatePipe, ReplaceNullPipe],
})
export class SharedModule {}
