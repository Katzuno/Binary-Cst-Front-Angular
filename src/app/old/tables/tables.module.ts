import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from 'src/app/app.module';

import {TablesRoutes} from 'src/app/old/tables/tables.routing';

import {ExtendedTableComponent} from 'src/app/old/tables/extendedtable/extendedtable.component';
import {RegularTableComponent} from 'src/app/old/tables/regulartable/regulartable.component';
import {DataTableComponent} from 'src/app/old/tables/datatable.net/datatable.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TablesRoutes),
        FormsModule,
        MaterialModule
    ],
    declarations: [
        ExtendedTableComponent,
        DataTableComponent,
        RegularTableComponent
    ]
})

export class TablesModule {
}
