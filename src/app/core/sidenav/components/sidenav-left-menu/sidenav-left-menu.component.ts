import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '@core/models/module.model';

@Component({
    selector: 'app-sidenav-left-menu',
    templateUrl: './sidenav-left-menu.component.html',
    styleUrls: ['./sidenav-left-menu.component.scss'],
})
export class SidenavLeftMenuComponent {
    @Input() modules: Module[];
    @Output() changeModule = new EventEmitter<Module>();

    constructor(private readonly router: Router) {}
}
