import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartsComponent} from 'src/app/old/charts/charts.component';
import {ChartsRoutes} from 'src/app/old/charts/charts.routing';

// import { LbdTableComponent } from '../lbd/lbd-table/lbd-table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ChartsRoutes),
        FormsModule
    ],
    declarations: [ChartsComponent]
})

export class ChartsModule {
}
