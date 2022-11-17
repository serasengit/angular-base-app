import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerComponent } from './spinner.component';

@NgModule({
    declarations: [SpinnerComponent],
    imports: [CommonModule, SharedModule],
    exports: [SpinnerComponent],
})
export class SpinnerModule {}
