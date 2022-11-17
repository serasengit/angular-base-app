import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/http-config-interceptor';
import { NgModule } from '@angular/core';
import { SpinnerModule } from './spinner/spinner.module';
import { SidenavModule } from './sidenav/sidenav.module';

@NgModule({
    imports: [SidenavModule, SpinnerModule],
    exports: [SidenavModule, SpinnerModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {}
