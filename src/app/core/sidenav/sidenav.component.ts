import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DeviceType } from '@app/app.component';
import { setModule } from '@app/store/actions/app.actions';
import { getModuleCode, getDeviceType } from '@app/store/selectors/app.selectors';
import { Module } from '@core/models/module.model';
import { select, Store } from '@ngrx/store';

import { AppState } from '../../store/reducers/app.reducers';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    readonly moduleCode$ = this.appStore.pipe(select(getModuleCode));
    readonly deviceType$ = this.appStore.pipe(select(getDeviceType));

    readonly DeviceType = DeviceType;
    readonly modules: Module[] = [
        {
            id: 1,
            code: 'dashboard',
            description: 'Dashboard',
            link: '/dashboard',
            icon: 'dashboard',
            order: 1,
        },
    ];

    @ViewChild(MatSidenav) sidenav?: MatSidenav;

    constructor(readonly appStore: Store<AppState>) {}

    async setModule(module: Module): Promise<void> {
        this.appStore.dispatch(setModule({ module }));
        this.sidenav?.toggle();
    }

    toggleSidenav(): void {
        this.sidenav?.toggle();
    }
}
