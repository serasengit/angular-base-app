import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Module } from '@core/models/module.model';

@Component({
    selector: 'app-sidenav-top-menu',
    templateUrl: './sidenav-top-menu.component.html',
    styleUrls: ['./sidenav-top-menu.component.scss'],
})
export class SidenavTopMenuComponent {
    @Input() moduleCode: string;
    @Output() changeModule = new EventEmitter<Module>();
    @Output() toggleSidenav = new EventEmitter<void>();
}
