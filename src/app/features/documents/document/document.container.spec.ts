import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appReducer } from '@app/store/reducers/app.reducers';
import { StoreModule } from '@ngrx/store';

import { DocumentContainer } from './document.container';
import { documentReducer } from './store/reducers/document.reducer';

describe('Document: Container', () => {
    let component: DocumentContainer;
    let fixture: ComponentFixture<DocumentContainer>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    document: documentReducer,
                    app: appReducer,
                }),
            ],
            declarations: [DocumentContainer],
        }).compileComponents();
        // Load components
        fixture = TestBed.createComponent(DocumentContainer);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
