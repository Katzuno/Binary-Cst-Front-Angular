import {Routes} from '@angular/router';

import {UserComponent} from 'src/app/old/userpage/user.component';

export const UserRoutes: Routes = [
    {

        path: '',
        children: [{
            path: 'pages/user',
            component: UserComponent
        }]
    }
];
