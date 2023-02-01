import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleCode } from '@core/models/module.model';
import { DocumentsContainer } from '@features/documents/documents.container';
import { DocumentResolver } from '@features/documents/resolvers/document.resolver';

const routes: Routes = [
    {
        path: ModuleCode.Documents,
        component: DocumentsContainer,
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
