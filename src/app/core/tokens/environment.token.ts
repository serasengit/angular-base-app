import { Environment } from '@core/models/environment.model';
import { InjectionToken } from '@angular/core';

export const ENVIRONMENT = new InjectionToken<Environment>('environment');
