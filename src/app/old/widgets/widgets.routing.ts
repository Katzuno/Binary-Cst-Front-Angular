import {Routes} from '@angular/router';

import {WidgetsComponent} from 'src/app/old/widgets/widgets.component';

export const WidgetsRoutes: Routes = [
    {

        path: '',
        children: [{
            path: '',
            component: WidgetsComponent
        }]
    }
];
