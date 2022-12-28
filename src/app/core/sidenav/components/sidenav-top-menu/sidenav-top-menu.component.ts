import { Component, EventEmitter, Output } from '@angular/core';
import { Language } from '@app/app.component';

@Component({
    selector: 'app-sidenav-top-menu',
    templateUrl: './sidenav-top-menu.component.html',
    styleUrls: ['./sidenav-top-menu.component.scss'],
})
export class SidenavTopMenuComponent {
    @Output() toggleSidenav = new EventEmitter<void>();
    @Output() changeLanguage = new EventEmitter<Language>();
    readonly Language = Language;
}
