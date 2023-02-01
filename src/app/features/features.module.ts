import { NgModule } from '@angular/core';
import { DocumentsModule } from './documents/documents.module';
import { GroupsModule } from './groups/groups.module';
import { PromotersModule } from './promoters/promoters.module';

@NgModule({
    imports: [DocumentsModule, PromotersModule, GroupsModule],
    exports: [],
})
export class FeaturesModule {}
