import { trigger, transition, style, animate, state } from '@angular/animations';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { getDeviceType } from '@app/store/selectors/app.selectors';
import { select, Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { DocumentFilterComponent } from './components/document-filter/document-filter.component';
import { DocumentFilter } from './models/document-filter.model';
import { DocumentState } from './models/document-state.model';
import { Document } from './models/document.model';
import { clearDocument, fetchDocument, fetchDocuments, purge, setFilter } from './store/actions/document.actions';
import { DeviceType } from '../../../app.component';
import {
    getDocument,
    getDocuments,
    getDocumentStates,
    getDocumentTypes,
    getFilter,
    getGroups,
    hasError,
} from './store/selectors/document.selector';

@Component({
    selector: 'app-document',
    templateUrl: './document.container.html',
    styleUrls: ['./document.container.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)' })),
            transition('void => *', [style({ transform: 'translateX(100%)' }), animate(200)]),
            transition('* => void', [animate(100, style({ transform: 'translateX(100%)' }))]),
        ]),
    ],
})
export class DocumentContainer implements OnDestroy {
    @ViewChild(DocumentFilterComponent) documentFilter: DocumentFilterComponent;

    readonly hasError$ = this.store.pipe(select(hasError));
    readonly deviceType$ = this.store.pipe(select(getDeviceType));
    readonly groups$ = this.store.pipe(select(getGroups));
    readonly documentStates$ = this.store.pipe(select(getDocumentStates));
    readonly documentTypes$ = this.store.pipe(select(getDocumentTypes));
    readonly filter$ = this.store.pipe(select(getFilter));
    readonly documents$ = this.store.pipe(select(getDocuments));
    readonly document$ = this.store.pipe(select(getDocument));

    readonly DeviceType = DeviceType;

    readonly params$ = combineLatest([
        this.hasError$,
        this.deviceType$,
        this.groups$,
        this.documentStates$,
        this.documentTypes$,
        this.documents$,
        this.document$,
    ]).pipe(
        map(([hasError, deviceType, groups, documentStates, documentTypes, documents, document]) => {
            return { hasError, deviceType, groups, documentStates, documentTypes, documents, document };
        })
    );

    constructor(private readonly store: Store<DocumentState>) {}

    setFilter(filter: DocumentFilter): void {
        this.store.dispatch(setFilter({ filter }));
    }

    onSubmit(filter: DocumentFilter): void {
        this.store.dispatch(fetchDocuments({ filter }));
    }

    fetchDocument(id: number): void {
        this.store.dispatch(fetchDocument({ id }));
    }

    clearDocument(): void {
        this.store.dispatch(clearDocument());
    }

    getDocumentsClass(document: Document, deviceType: DeviceType): string {
        return document && deviceType !== DeviceType.Small && deviceType !== DeviceType.Medium
            ? 'document__list col-8'
            : 'document__list col-12';
    }

    getDocumentClass(deviceType: DeviceType): string {
        return deviceType !== DeviceType.Small && deviceType !== DeviceType.Medium ? 'document__detail col-4' : 'document__detail col-12';
    }

    showDocuments(documents: Document[], document: Document, deviceType: DeviceType): boolean {
        return (
            (documents && deviceType !== DeviceType.Small && deviceType !== DeviceType.Medium) ||
            (documents && !document && (deviceType === DeviceType.Small || deviceType === DeviceType.Medium))
        );
    }

    ngOnDestroy(): void {
        this.store.dispatch(purge());
    }
}
