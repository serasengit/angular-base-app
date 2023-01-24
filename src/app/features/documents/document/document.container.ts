import { Component, OnDestroy, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
import { DocumentFilter } from './models/document-filter.model';
import { DocumentState } from './models/document-state.model';
import { fetchDocuments, purge, setFilter } from './store/actions/document.actions';
import { getDocuments, getDocumentStates, getDocumentTypes, getFilter, getGroups, hasError } from './store/selectors/document.selector';

@Component({
    selector: 'app-document',
    templateUrl: './document.container.html',
    styleUrls: ['./document.container.scss'],
})
export class DocumentContainer implements OnDestroy {
    @ViewChild(DocumentFilterComponent) documentFilter: DocumentFilterComponent;

    readonly hasError$ = this.store.pipe(select(hasError));
    readonly groups$ = this.store.pipe(select(getGroups));
    readonly documentStates$ = this.store.pipe(select(getDocumentStates));
    readonly documentTypes$ = this.store.pipe(select(getDocumentTypes));
    readonly filter$ = this.store.pipe(select(getFilter));
    readonly documents$ = this.store.pipe(select(getDocuments));

    constructor(private readonly store: Store<DocumentState>) {}

    setFilter(filter: DocumentFilter): void {
        this.store.dispatch(setFilter({ filter }));
    }

    onSubmit(filter: DocumentFilter): void {
        this.store.dispatch(fetchDocuments({ filter }));
    }

    ngOnDestroy(): void {
        this.store.dispatch(purge());
    }
}
