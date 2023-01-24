import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { appReducer } from '@app/store/reducers/app.reducers';
import { ModuleLink } from '@core/models/module.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { PromoterService } from '@features/documents/promoter/services/promoter-service';
import { GroupService } from '@features/group/services/group-service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { DOCUMENT_STATES_MOCK_RESPONSE } from 'src/assets/mocks/responses/document-states.mock-response';
import { DOCUMENT_TYPES_MOCK_RESPONSE } from 'src/assets/mocks/responses/document-types.mock-response';
import { DOCUMENTS_MOCK_RESPONSE } from 'src/assets/mocks/responses/documents.mock-response';
import { GROUPS_MOCK_RESPONSE } from 'src/assets/mocks/responses/groups.mock-response';
import { environment } from 'src/environments/environment';

import { DocumentContainer } from '../../document.container';
import { DocumentResolver } from '../../resolvers/document.resolver';
import { DocumentStateService } from '../../services/document-state.service';
import { DocumentTypeService } from '../../services/document-type.service';
import { DocumentService } from '../../services/document.service';
import { DocumentEffects } from '../../store/effects/document.effects';
import { documentReducer } from '../../store/reducers/document.reducer';
import { DocumentFilterComponent } from '../document-filter/document-filter.component';
import { DocumentListComponent } from './document-list.component';

describe('Document: List Component', () => {
    let component: DocumentListComponent;
    let loader: HarnessLoader;
    let fixture: ComponentFixture<DocumentContainer>;
    let router: Router;
    let groupService: GroupService;
    let documentStateService: DocumentStateService;
    let documentTypeService: DocumentTypeService;
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
            declarations: [DocumentContainer, DocumentFilterComponent, DocumentListComponent],
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
        fixture = TestBed.createComponent(DocumentContainer);
        groupService = TestBed.inject(GroupService);
        documentTypeService = TestBed.inject(DocumentTypeService);
        documentStateService = TestBed.inject(DocumentStateService);
        documentService = TestBed.inject(DocumentService);
        loader = TestbedHarnessEnvironment.loader(fixture);
        router = TestBed.inject(Router);
        component = fixture.debugElement.componentInstance;
        // Listeners
        spyOn(groupService, 'find').and.returnValue(of(GROUPS_MOCK_RESPONSE));
        spyOn(documentTypeService, 'findAll').and.returnValue(of(DOCUMENT_TYPES_MOCK_RESPONSE));
        spyOn(documentStateService, 'findAll').and.returnValue(of(DOCUMENT_STATES_MOCK_RESPONSE));
        spyOn(documentService, 'find').and.returnValue(of(DOCUMENTS_MOCK_RESPONSE));
        await router.navigateByUrl(ModuleLink.Documents);
        await fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should show table rows', async () => {
        const documentsTable = fixture.debugElement.query(By.directive(DocumentListComponent));
        expect((<DocumentListComponent>documentsTable.componentInstance).dataSource.data.length).toBe(3);
    });
    it('should filter table rows', async () => {
        const documentsTable = fixture.debugElement.query(By.directive(DocumentListComponent));
        expect((<DocumentListComponent>documentsTable.componentInstance).dataSource.filteredData.length).toBe(3);
        const filterInput = await loader.getHarness(MatInputHarness.with({ selector: '#filter' }));
        await filterInput.setValue('Juan Sereno Martínez');
        expect((<DocumentListComponent>documentsTable.componentInstance).dataSource.filteredData.length).toBe(1);
    });
});
