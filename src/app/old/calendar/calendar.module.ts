import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CalendarComponent} from 'src/app/old/calendar/calendar.component';
import {CalendarRoutes} from 'src/app/old/calendar/calendar.routing';

// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CalendarRoutes),
        FormsModule
    ],
    declarations: [CalendarComponent]
})

export class CalendarModule {
}
