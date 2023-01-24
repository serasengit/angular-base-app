import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentContainer } from '@features/documents/document/document.container';
import { DocumentResolver } from '@features/documents/document/resolvers/document.resolver';
import { DocumentStateService } from '@features/documents/document/services/document-state.service';
import { DocumentTypeService } from '@features/documents/document/services/document-type.service';
import { DocumentEffects } from '@features/documents/document/store/effects/document.effects';
import { documentReducer } from '@features/documents/document/store/reducers/document.reducer';
import { GroupService } from '@features/group/services/group-service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { PromoterService } from '../promoter/services/promoter-service';

import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
import { DocumentService } from './services/document.service';
import { DocumentListComponent } from './components/document-list/document-list.component';

@NgModule({
    declarations: [DocumentContainer, DocumentFilterComponent, DocumentListComponent],
    imports: [SharedModule, CommonModule, StoreModule.forFeature('document', documentReducer), EffectsModule.forFeature([DocumentEffects])],
    providers: [DocumentResolver, DocumentService, PromoterService, DocumentStateService, DocumentTypeService, GroupService],
})
export class DocumentModule {}
