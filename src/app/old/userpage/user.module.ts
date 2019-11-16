import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {UserComponent} from 'src/app/old/userpage/user.component';
import {UserRoutes} from 'src/app/old/userpage/user.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule
    ],
    declarations: [UserComponent]
})

export class UserModule {
}
