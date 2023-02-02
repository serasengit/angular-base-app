import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { fetchDocumentStates, fetchDocumentTypes, fetchGroups, fetchDocuments } from '@features/documents/store/actions/documents.actions';
import { DocumentState } from '@features/documents/store/reducers/documents.reducer';
import { getDocuments, getDocumentStates, getDocumentTypes, getGroups } from '@features/documents/store/selectors/documents.selector';
import { select, Store } from '@ngrx/store';
import { combineLatest, firstValueFrom } from 'rxjs';

@Injectable()
export class DocumentResolver implements Resolve<Document> {
    private readonly documentTypes$ = this.store.pipe(select(getDocumentTypes));
    private readonly documentStates$ = this.store.pipe(select(getDocumentStates));
    private readonly groups$ = this.store.pipe(select(getGroups));
    private readonly documents$ = this.store.pipe(select(getDocuments));

    constructor(protected readonly store: Store<DocumentState>) {}

    public async resolve(): Promise<any> {
        const [documentTypes, documentStates, groups, documents] = await firstValueFrom(
            combineLatest([this.documentTypes$, this.documentStates$, this.groups$, this.documents$])
        );
        if (!documentTypes) this.fetchDocumentTypes();
        if (!documentStates) this.fetchDocumentStates();
        if (!groups) this.fetchGroups();
        if (!documents) this.fetchDocuments();
    }

    private fetchDocumentTypes(): void {
        this.store.dispatch(fetchDocumentTypes());
    }

    private fetchDocumentStates(): void {
        this.store.dispatch(fetchDocumentStates());
    }

    private fetchGroups(): void {
        this.store.dispatch(fetchGroups({ withSubGroups: true }));
    }

    private fetchDocuments(): void {
        this.store.dispatch(fetchDocuments({}));
    }
}
