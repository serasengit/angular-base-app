import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { Observable } from 'rxjs';
import { Environment } from '@core/models/environment.model';
import { Document } from '../models/document.model';
@Injectable()
export class DocumentService {
    constructor(@Inject(ENVIRONMENT) private readonly environment: Environment, private readonly http: HttpClient) {}
    find(
        groupId?: number,
        subGroupId?: number,
        typeId?: number,
        stateId?: number,
        startDate?: Date,
        endDate?: Date
    ): Observable<Document[]> {
        let params: HttpParams = new HttpParams();
        if (typeId) params = params.set('typeId', typeId);
        if (stateId) params = params.set('stateId', stateId);
        if (groupId) params = params.set('groupId', groupId);
        if (subGroupId) params = params.set('subGroupId', subGroupId);
        if (startDate) params = params.set('startDate', startDate.toISOString());
        if (endDate) params = params.set('endDate', endDate.toISOString());
        const url = `${this.environment.API.url}${this.environment.API.prefix}/${this.environment.API.version}/documents`;
        return this.http.get<Document[]>(url, { params });
    }

    findById(id: number): Observable<Document> {
        const url = `${this.environment.API.url}${this.environment.API.prefix}/${this.environment.API.version}/documents/${id}`;
        return this.http.get<Document>(url);
    }
}
