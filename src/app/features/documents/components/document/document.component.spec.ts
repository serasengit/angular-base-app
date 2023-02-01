import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCellHarness } from '@angular/material/table/testing';
import { MatTabHarness } from '@angular/material/tabs/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { appReducer } from '@app/store/reducers/app.reducers';
import { ModuleLink } from '@core/models/module.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { GroupService } from '@features/groups/services/group-service';
import { PromoterService } from '@features/promoters/services/promoter-service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { DOCUMENT_MOCK_RESPONSE } from 'src/assets/mocks/responses/document.mock-response';
import { DOCUMENTS_MOCK_RESPONSE } from 'src/assets/mocks/responses/documents.mock-response';
import { environment } from 'src/environments/environment';

import { DocumentsContainer } from '../../documents.container';
import { DocumentResolver } from '../../resolvers/document.resolver';
import { DocumentStateService } from '../../services/document-state.service';
import { DocumentTypeService } from '../../services/document-type.service';
import { DocumentService } from '../../services/document.service';
import { DocumentEffects } from '../../store/effects/documents.effects';
import { documentReducer } from '../../store/reducers/documents.reducer';
import { DocumentFilterComponent } from '../document-filter/document-filter.component';
import { DocumentListComponent } from '../document-list/document-list.component';
import { DocumentDetailComponent } from './components/document-detail/document-detail.component';
import { DocumentComponent } from './document.component';

describe('Documents: Document Component', () => {
    let component: DocumentComponent;
    let loader: HarnessLoader;
    let fixture: ComponentFixture<DocumentsContainer>;
    let router: Router;
    let documentService: DocumentService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                EffectsModule.forRoot([]),
                StoreModule.forRoot({
                    document: documentReducer,
                    app: appReducer,
                }),
                EffectsModule.forFeature([DocumentEffects]),
                StoreModule.forFeature('document', documentReducer),
                TranslateModule.forRoot({}),
                BrowserAnimationsModule,
                AppRoutingModule,
                HttpClientModule,
                SharedModule,
            ],
            declarations: [DocumentsContainer, DocumentListComponent, DocumentFilterComponent, DocumentComponent, DocumentDetailComponent],
            providers: [
                DocumentResolver,
                GroupService,
                DocumentTypeService,
                DocumentStateService,
                PromoterService,
                DocumentService,
                { provide: ENVIRONMENT, useValue: environment },
            ],
        }).compileComponents();
        // Load components
        fixture = TestBed.createComponent(DocumentsContainer);
        documentService = TestBed.inject(DocumentService);
        loader = TestbedHarnessEnvironment.loader(fixture);
        router = TestBed.inject(Router);
        component = fixture.debugElement.componentInstance;
        // Listeners
        spyOn(documentService, 'find').and.returnValue(of(DOCUMENTS_MOCK_RESPONSE));
        spyOn(documentService, 'findById').and.returnValue(of(DOCUMENT_MOCK_RESPONSE));
        await router.navigateByUrl(ModuleLink.Documents);
        await fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should show document component', async () => {
        const documentRow = <MatCellHarness>await loader.getHarness(MatCellHarness);
        (await documentRow.host()).click();
        const documentTab = <MatTabHarness>await loader.getHarness(MatTabHarness.with({ label: 'DETAIL' }));
        expect(documentTab).toBeTruthy();
    });
});
