import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Environment } from '@core/models/environment.model';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { Observable } from 'rxjs';
import { DocumentType } from '@features/documents/document/models/document-type.model';
@Injectable()
export class DocumentTypeService {
    constructor(@Inject(ENVIRONMENT) private readonly environment: Environment, private readonly http: HttpClient) {}

    findAll(): Observable<DocumentType[]> {
        const url = `${this.environment.API.url}${this.environment.API.prefix}/${this.environment.API.version}/document-types`;
        return this.http.get<DocumentType[]>(url);
    }
}
