import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AppRoutingModule } from '@app/app-routing.module';
import { appReducer } from '@app/store/reducers/app.reducers';
import { ModuleLink } from '@core/models/module.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { PromoterService } from '@features/promoters/services/promoter-service';
import { GroupService } from '@features/groups/services/group-service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { of } from 'rxjs';
import { DOCUMENT_STATES_MOCK_RESPONSE } from 'src/assets/mocks/responses/document-states.mock-response';
import { DOCUMENT_TYPES_MOCK_RESPONSE } from 'src/assets/mocks/responses/document-types.mock-response';
import { GROUPS_MOCK_RESPONSE } from 'src/assets/mocks/responses/groups.mock-response';
import { environment } from 'src/environments/environment';

import { DocumentsContainer } from '../../documents.container';
import { DocumentResolver } from '../../resolvers/document.resolver';
import { DocumentStateService } from '../../services/document-state.service';
import { DocumentTypeService } from '../../services/document-type.service';
import { DocumentService } from '../../services/document.service';
import { DocumentEffects } from '../../store/effects/documents.effects';
import { documentReducer } from '../../store/reducers/documents.reducer';
import { DocumentFilterComponent } from './document-filter.component';

describe('Documents: Document Filter Component', () => {
    let component: DocumentFilterComponent;
    let loader: HarnessLoader;
    let fixture: ComponentFixture<DocumentsContainer>;
    let router: Router;
    let groupService: GroupService;
    let documentStateService: DocumentStateService;
    let documentTypeService: DocumentTypeService;

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
            declarations: [DocumentsContainer, DocumentFilterComponent],
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
        groupService = TestBed.inject(GroupService);
        documentTypeService = TestBed.inject(DocumentTypeService);
        documentStateService = TestBed.inject(DocumentStateService);
        loader = TestbedHarnessEnvironment.loader(fixture);
        router = TestBed.inject(Router);
        component = fixture.debugElement.componentInstance;
        // Listeners
        spyOn(groupService, 'find').and.returnValue(of(GROUPS_MOCK_RESPONSE));
        spyOn(documentTypeService, 'findAll').and.returnValue(of(DOCUMENT_TYPES_MOCK_RESPONSE));
        spyOn(documentStateService, 'findAll').and.returnValue(of(DOCUMENT_STATES_MOCK_RESPONSE));
        await router.navigateByUrl(ModuleLink.Documents);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load groups', async () => {
        // Retrieve groups
        const groupsSelect = await loader.getHarness(MatSelectHarness.with({ selector: '#group' }));
        // Check groups are loaded
        await groupsSelect.open();
        expect((await groupsSelect.getOptions()).length).toBeGreaterThan(0);
    });
    it('should clear group option', async () => {
        // Select group
        const groupsSelect = await loader.getHarness(MatSelectHarness.with({ selector: '#group' }));
        await groupsSelect.open();
        const groupOption = (await groupsSelect.getOptions())[0];
        await groupOption.click();
        let groupValue = await (await loader.getHarness(MatSelectHarness.with({ selector: '#group' }))).getValueText();
        // Clear group option
        const icons = await loader.getAllHarnesses(MatIconHarness);
        const clearIcon = icons.find(async (icon) => (await icon.getName()) === 'close');
        await (await clearIcon.host()).click();
        // Retrieve group value
        groupValue = await (await loader.getHarness(MatSelectHarness.with({ selector: '#group' }))).getValueText();
        expect(groupValue).toBe('');
    });

    it('should load subGroups', async () => {
        // Retrieve subGroups
        const subGroupsSelect = await loader.getHarness(MatSelectHarness.with({ selector: '#subGroup' }));
        // Check subGroups are loaded
        await subGroupsSelect.open();
        expect((await subGroupsSelect.getOptions()).length).toBe(0);
        // Select group
        const groupsSelect = await loader.getHarness(MatSelectHarness.with({ selector: '#group' }));
        await groupsSelect.open();
        const groupOption = (await groupsSelect.getOptions())[0];
        await groupOption.click();
        await fixture.detectChanges();
        await subGroupsSelect.open();
        expect((await subGroupsSelect.getOptions()).length).toBeGreaterThan(0);
    });

    it('should load document types', async () => {
        // Retrieve groups
        const documentTypesSelect = await loader.getHarness(MatSelectHarness.with({ selector: '#documentType' }));
        // Check documentTypes are loaded
        await documentTypesSelect.open();
        expect((await documentTypesSelect.getOptions()).length).toBeGreaterThan(0);
        const documentTypeOption = (await documentTypesSelect.getOptions())[0];
        await documentTypeOption.click();
    });
    it('should load document states', async () => {
        // Retrieve groups
        const documentStatesSelect = await loader.getHarness(MatSelectHarness.with({ selector: '#documentState' }));
        // Check documentStates are loaded
        await documentStatesSelect.open();
        expect((await documentStatesSelect.getOptions()).length).toBeGreaterThan(0);
        const documentStateOption = (await documentStatesSelect.getOptions())[0];
        await documentStateOption.click();
    });
});
