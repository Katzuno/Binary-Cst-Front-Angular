import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TimelineComponent} from 'src/app/old/timeline/timeline.component';
import {TimelineRoutes} from 'src/app/old/timeline/timeline.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TimelineRoutes),
        FormsModule
    ],
    declarations: [TimelineComponent]
})

export class TimelineModule {
}
