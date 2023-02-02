import { Directive, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive()
export abstract class FormBase<T> implements OnDestroy {
    @Output() readonly changeValue = new EventEmitter<T>();

    protected readonly unsubscribe$ = new Subject<void>();
    form: FormGroup;

    constructor(protected readonly formBuilder: FormBuilder) {}

    protected abstract initForm(): void;

    validate(): void {
        this.form?.markAllAsTouched();
        this.form?.updateValueAndValidity();
    }

    clear(controls: AbstractControl[]): void {
        for (const control of controls) control.reset();
    }

    get valid(): boolean {
        return this.form?.valid ?? false;
    }

    getFieldError(control: AbstractControl): string {
        return control.hasError('required')
            ? 'required_field'
            : control.hasError('minlength')
            ? 'value_too_short'
            : control.hasError('maxlength')
            ? 'value_too_long'
            : 'invalid_field';
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
