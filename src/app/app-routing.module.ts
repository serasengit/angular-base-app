import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleCode } from '@core/models/module.model';
import { DocumentContainer } from '@features/documents/document/document.container';
import { DocumentResolver } from '@features/documents/document/resolvers/document.resolver';

const routes: Routes = [
    {
        path: ModuleCode.Documents,
        component: DocumentContainer,
        resolve: {
            data: DocumentResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
