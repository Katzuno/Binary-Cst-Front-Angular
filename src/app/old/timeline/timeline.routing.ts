import {Routes} from '@angular/router';

import {TimelineComponent} from 'src/app/old/timeline/timeline.component';

export const TimelineRoutes: Routes = [
    {

        path: '',
        children: [{
            path: 'pages/timeline',
            component: TimelineComponent
        }]
    }
];
