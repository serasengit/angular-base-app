import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appReducer } from '@app/store/reducers/app.reducers';
import { StoreModule } from '@ngrx/store';

import { DocumentsContainer } from './documents.container';
import { documentReducer } from './store/reducers/documents.reducer';

describe('Document: Container', () => {
    let component: DocumentsContainer;
    let fixture: ComponentFixture<DocumentsContainer>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    document: documentReducer,
                    app: appReducer,
                }),
            ],
            declarations: [DocumentsContainer],
        }).compileComponents();
        // Load components
        fixture = TestBed.createComponent(DocumentsContainer);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
