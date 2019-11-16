import {Routes} from '@angular/router';

import {FullScreenMapsComponent} from 'src/app/old/maps/fullscreenmap/fullscreenmap.component';
import {GoogleMapsComponent} from 'src/app/old/maps/googlemaps/googlemaps.component';
import {VectorMapsComponent} from 'src/app/old/maps/vectormaps/vectormaps.component';

export const MapsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'fullscreen',
            component: FullScreenMapsComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'google',
            component: GoogleMapsComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'vector',
            component: VectorMapsComponent
        }]
    }
];
