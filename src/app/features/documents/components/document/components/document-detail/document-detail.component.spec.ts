import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCellHarness } from '@angular/material/table/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { appReducer } from '@app/store/reducers/app.reducers';
import { ModuleLink } from '@core/models/module.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { DocumentFilterComponent } from '@features/documents/components/document-filter/document-filter.component';
import { DocumentListComponent } from '@features/documents/components/document-list/document-list.component';
import { DocumentsContainer } from '@features/documents/documents.container';
import { DocumentResolver } from '@features/documents/resolvers/document.resolver';
import { DocumentStateService } from '@features/documents/services/document-state.service';
import { DocumentTypeService } from '@features/documents/services/document-type.service';
import { DocumentService } from '@features/documents/services/document.service';
import { DocumentEffects } from '@features/documents/store/effects/documents.effects';
import { documentReducer } from '@features/documents/store/reducers/documents.reducer';
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

import { DocumentComponent } from '../../document.component';
import { DocumentDetailComponent } from './document-detail.component';

describe('Documents: Document Detail Component', () => {
    let component: DocumentDetailComponent;
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
    it('should show document detail component', async () => {
        const documentRow = <MatCellHarness>await loader.getHarness(MatCellHarness);
        (await documentRow.host()).click();
        const fieldLabel = fixture.debugElement.query(By.css('.document-detail__field__label'));
        const fieldValue = fixture.debugElement.query(By.css('.document-detail__field__value'));
        expect(fieldLabel.nativeElement.innerHTML).toContain('REGISTRATION_DATE');
        expect(fieldValue.nativeElement.innerHTML).toContain('10/15/21');
    });
});
