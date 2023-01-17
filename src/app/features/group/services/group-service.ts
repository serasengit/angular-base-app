import { HttpClient, HttpParams } from '@angular/common/http';
import { Environment } from '@core/models/environment.model';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { Observable } from 'rxjs';
import { Group } from '../models/group-model';

@Injectable()
export class GroupService {
    constructor(@Inject(ENVIRONMENT) private readonly environment: Environment, private readonly http: HttpClient) {}

    find(withSubGroups?: boolean): Observable<Group[]> {
        let params: HttpParams = new HttpParams();
        if (withSubGroups) params = params.set('withSubGroups', withSubGroups);
        const url = `${this.environment.API.url}${this.environment.API.prefix}/${this.environment.API.version}/groups`;
        return this.http.get<Group[]>(url, { params });
    }
}
