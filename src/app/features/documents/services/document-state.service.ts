import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment } from '@core/models/environment.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { Observable } from 'rxjs';
import { DocumentState } from '@features/documents/models/document-state.model';

@Injectable()
export class DocumentStateService {
    constructor(@Inject(ENVIRONMENT) private readonly environment: Environment, private readonly http: HttpClient) {}

    findAll(): Observable<DocumentState[]> {
        const url = `${this.environment.API.url}${this.environment.API.prefix}/${this.environment.API.version}/document-states`;
        return this.http.get<DocumentState[]>(url);
    }
}
