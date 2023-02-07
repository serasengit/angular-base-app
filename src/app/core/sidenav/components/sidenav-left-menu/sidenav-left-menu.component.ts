import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Module, ModuleCode, ModuleLink } from '@core/models/module.model';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('package.json').version;

@Component({
    selector: 'app-sidenav-left-menu',
    templateUrl: './sidenav-left-menu.component.html',
    styleUrls: ['./sidenav-left-menu.component.scss'],
})
export class SidenavLeftMenuComponent {
    readonly modules: Module[] = [
        {
            code: ModuleCode.Documents,
            link: ModuleLink.Documents,
            icon: 'folder_shared',
        },
    ];
    @Output() changeModule = new EventEmitter<Module>();

    constructor(private readonly router: Router) {}

    get version(): string {
        return version;
    }
}
