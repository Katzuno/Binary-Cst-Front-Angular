import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from 'src/app/app.module';

import {WidgetsComponent} from 'src/app/old/widgets/widgets.component';
import {WidgetsRoutes} from 'src/app/old/widgets/widgets.routing';

@NgModule({
    imports: [
        RouterModule.forChild(WidgetsRoutes),
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [WidgetsComponent]
})

export class WidgetsModule {
}
