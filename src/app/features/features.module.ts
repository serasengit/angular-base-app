import { NgModule } from '@angular/core';
import { DocumentModule } from '@features/documents/document/document.module';
import { PromoterModule } from '@features/documents/promoter/promoter.module';
import { GroupModule } from '@features/group/group.module';

@NgModule({
    imports: [DocumentModule, PromoterModule, GroupModule],
    exports: [],
})
export class FeaturesModule {}
