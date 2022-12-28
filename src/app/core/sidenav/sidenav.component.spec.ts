import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appReducer } from '@app/store/reducers/app.reducers';
import { ENVIRONMENT } from '@core/tokens/environment.token';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';
import { environment } from 'src/environments/environment';

import { SidenavTopMenuComponent } from './components/sidenav-top-menu/sidenav-top-menu.component';
import { SidenavComponent } from './sidenav.component';
import { SidenavModule } from './sidenav.module';

describe('Sidenav: Component ', () => {
    let fixture: ComponentFixture<SidenavComponent>;
    let sidenav: SidenavComponent;
    let sidenavTopMenu: DebugElement;
    let loader: HarnessLoader;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                SharedModule,
                TranslateModule.forRoot({}),
                StoreModule.forRoot({ app: appReducer }),
                EffectsModule.forRoot([]),
                SidenavModule,
            ],
            providers: [{ provide: ENVIRONMENT, useValue: environment }],
        }).compileComponents();
        fixture = TestBed.createComponent(SidenavComponent);
        sidenav = fixture.debugElement.componentInstance;
        sidenavTopMenu = fixture.debugElement.query(By.directive(SidenavTopMenuComponent));
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('should create the sidenav', () => {
        expect(sidenav).toBeTruthy();
    });
    it('should open top sidenav', async () => {
        const toggleSidenavBtn = await loader.getHarness(MatButtonHarness.with({ selector: '.sidenav-top-menu__toolbar__menu' }));
        await toggleSidenavBtn.click();
        const sidenav = await loader.getHarness(MatSidenavHarness.with({ selector: '#sidenav' }));
        const isOpen = await sidenav.isOpen();
        expect(isOpen).toBe(true);
    });
    it('should close top sidenav', async () => {
        const toggleSidenavBtn = await loader.getHarness(MatButtonHarness.with({ selector: '.sidenav-top-menu__toolbar__menu' }));
        await toggleSidenavBtn.click();
        await toggleSidenavBtn.click();
        const sidenav = await loader.getHarness(MatSidenavHarness.with({ selector: '#sidenav' }));
        const isOpen = await sidenav.isOpen();
        expect(isOpen).toBe(false);
    });

    it('should not have the settings menu open', async () => {
        const languagesBtn = sidenavTopMenu.query(By.css('.sidenav-top-menu__toolbar__settings__menu__languages'));
        expect(languagesBtn).toBeFalsy();
    });
    it('open the menu when clicking on the settings button and select english language', async () => {
        const settingsBtn = await loader.getHarness(MatButtonHarness.with({ selector: '.sidenav-top-menu__toolbar__settings' }));
        await settingsBtn.click();
        const settingsMenu = await loader.getHarness(MatMenuHarness);
        const languageItem = (await settingsMenu.getItems())[0];
        await languageItem.click();
        const languageMenu = await settingsMenu.getHarness(MatMenuHarness);
        const englishItem = (await languageMenu.getItems())[0];
        await englishItem.click();
        expect(await languageItem.getText()).toBe('languages');
    });
});
