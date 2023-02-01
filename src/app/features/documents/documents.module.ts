import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentsContainer } from '@features/documents/documents.container';
import { DocumentResolver } from '@features/documents/resolvers/document.resolver';
import { DocumentStateService } from '@features/documents/services/document-state.service';
import { DocumentTypeService } from '@features/documents/services/document-type.service';
import { DocumentEffects } from '@features/documents/store/effects/documents.effects';
import { documentReducer } from '@features/documents/store/reducers/documents.reducer';
import { GroupService } from '@features/groups/services/group-service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { PromoterService } from '../promoters/services/promoter-service';

import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
import { DocumentService } from './services/document.service';
import { DocumentListComponent } from './components/document-list/document-list.component';

@NgModule({
    declarations: [DocumentsContainer, DocumentFilterComponent, DocumentListComponent],
    imports: [SharedModule, CommonModule, StoreModule.forFeature('document', documentReducer), EffectsModule.forFeature([DocumentEffects])],
    providers: [DocumentResolver, DocumentService, PromoterService, DocumentStateService, DocumentTypeService, GroupService],
})
export class DocumentsModule {}
