import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@core/core.module';
import { SpinnerComponent } from '@core/spinner/spinner.component';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent, DeviceType, getDevice } from './app.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { appReducer } from './store/reducers/app.reducers';

describe('App: Component', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                StoreModule.forRoot({}),
                TranslateModule.forRoot(),
                CoreModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({ app: appReducer }),
            ],
            declarations: [AppComponent, SpinnerComponent, SidenavComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
    });
    it('should create the app', () => {
        expect(app).toBeTruthy();
    });
    it('onResize method is called', waitForAsync(() => {
        const spyOnResize = spyOn(app, 'onResize');
        window.dispatchEvent(new Event('resize'));
        expect(spyOnResize).toHaveBeenCalled();
    }));
    it('getDevice should return small', waitForAsync(() => {
        expect(getDevice(60)).toEqual(DeviceType.Small);
    }));
    it('getDevice should return medium', waitForAsync(() => {
        expect(getDevice(800)).toEqual(DeviceType.Medium);
    }));
    it('getDevice should return large', waitForAsync(() => {
        expect(getDevice(1000)).toEqual(DeviceType.Large);
    }));
    it('getDevice should return extraLarge', waitForAsync(() => {
        expect(getDevice(1201)).toEqual(DeviceType.ExtraLarge);
    }));
});
