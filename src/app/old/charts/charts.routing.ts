import {Routes} from '@angular/router';

import {ChartsComponent} from 'src/app/old/charts/charts.component';

export const ChartsRoutes: Routes = [
    {

        path: '',
        children: [{
            path: '',
            component: ChartsComponent
        }]
    }
];
