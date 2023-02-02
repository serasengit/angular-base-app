import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Group } from '@features/groups/models/group-model';
import { FormBase } from '@shared/components/form-controls/form.base';
import { DateFormat } from '@shared/pipes/local-date.pipe';
import { takeUntil } from 'rxjs';

import { DocumentFilter } from '../../models/document-filter.model';
import { DocumentState } from '../../models/document-state.model';
import { DocumentType } from '../../models/document-type.model';

@Component({
    selector: 'app-document-filter',
    templateUrl: './document-filter.component.html',
    styleUrls: ['./document-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentFilterComponent extends FormBase<DocumentFilter> implements OnInit {
    @Input() groups: Group[] = [];
    @Input() documentStates: DocumentState[] = [];
    @Input() documentTypes: DocumentType[] = [];
    @Output() readonly onSubmit = new EventEmitter<DocumentFilter>();

    readonly DateFormat = DateFormat;

    constructor(protected override readonly formBuilder: FormBuilder) {
        super(formBuilder);
    }

    ngOnInit(): void {
        this.initForm();
        this.listenForm();
    }

    protected initForm(): void {
        this.form = this.formBuilder.group({
            group: [null],
            subGroup: [{ value: null, disabled: true }],
            documentType: [null],
            documentState: [null],
            startDate: [null],
            endDate: [null],
        });
    }

    private listenForm(): void {
        this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((filter: DocumentFilter) => {
            this.checkFieldsActivation(filter);
            this.changeValue.emit(filter);
        });
        this.group.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.subGroup.reset();
        });
    }

    private checkFieldsActivation(filter: DocumentFilter): void {
        filter.group ? this.subGroup.enable({ emitEvent: false }) : this.subGroup.disable({ emitEvent: false });
    }

    submit(): void {
        this.valid ? this.onSubmit.emit(this.form.value) : this.validate();
    }

    public get group(): AbstractControl {
        return this.form.controls['group'] as AbstractControl;
    }

    public get subGroup(): AbstractControl {
        return this.form.controls['subGroup'] as AbstractControl;
    }

    public get documentType(): AbstractControl {
        return this.form.controls['documentType'] as AbstractControl;
    }

    public get documentState(): AbstractControl {
        return this.form.controls['documentState'] as AbstractControl;
    }

    public get startDate(): AbstractControl {
        return this.form.controls['startDate'] as AbstractControl;
    }

    public get endDate(): AbstractControl {
        return this.form.controls['endDate'] as AbstractControl;
    }
}
