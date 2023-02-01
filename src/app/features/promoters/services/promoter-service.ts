import { HttpClient } from '@angular/common/http';
import { Environment } from '@core/models/environment.model';
import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { Observable } from 'rxjs';

import { Promoter } from '../models/promoter-model';

@Injectable()
export class PromoterService {
    constructor(@Inject(ENVIRONMENT) private readonly environment: Environment, private readonly http: HttpClient) {}

    findAll(): Observable<Promoter[]> {
        const url = `${this.environment.API.url}${this.environment.API.prefix}/${this.environment.API.version}/promoters`;
        return this.http.get<Promoter[]>(url);
    }
}
