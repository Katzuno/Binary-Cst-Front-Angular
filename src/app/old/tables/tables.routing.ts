import {Routes} from '@angular/router';

import {ExtendedTableComponent} from 'src/app/old/tables/extendedtable/extendedtable.component';
import {RegularTableComponent} from 'src/app/old/tables/regulartable/regulartable.component';
import {DataTableComponent} from 'src/app/old/tables/datatable.net/datatable.component';

export const TablesRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'regular',
            component: RegularTableComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'extended',
            component: ExtendedTableComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'datatables.net',
            component: DataTableComponent
        }]
    }
];
