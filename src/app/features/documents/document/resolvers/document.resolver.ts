import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { fetchDocumentStates, fetchDocumentTypes, fetchGroups } from '@features/documents/document/store/actions/document.actions';
import { DocumentState } from '@features/documents/document/store/reducers/document.reducer';
import { getDocumentStates, getDocumentTypes, getGroups } from '@features/documents/document/store/selectors/document.selector';
import { select, Store } from '@ngrx/store';
import { combineLatest, firstValueFrom } from 'rxjs';

@Injectable()
export class DocumentResolver implements Resolve<Document> {
    private readonly documentTypes$ = this.store.pipe(select(getDocumentTypes));
    private readonly documentStates$ = this.store.pipe(select(getDocumentStates));
    private readonly groups$ = this.store.pipe(select(getGroups));

    constructor(protected readonly store: Store<DocumentState>) {}

    public async resolve(): Promise<any> {
        const [documentTypes, documentStates, groups] = await firstValueFrom(
            combineLatest([this.documentTypes$, this.documentStates$, this.groups$])
        );
        if (!documentTypes) this.fetchDocumentTypes();
        if (!documentStates) this.fetchDocumentStates();
        if (!groups) this.fetchGroups();
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
}
