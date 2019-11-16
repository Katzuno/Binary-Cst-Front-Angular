import {Routes} from '@angular/router';

import {CalendarComponent} from 'src/app/old/calendar/calendar.component';

export const CalendarRoutes: Routes = [
    {

        path: '',
        children: [{
            path: '',
            component: CalendarComponent
        }]
    }
];
