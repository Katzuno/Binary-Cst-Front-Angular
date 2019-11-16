import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {TagInputModule} from 'ngx-chips';
import {MaterialModule} from 'src/app/app.module';
import {FormsRoutes} from 'src/app/old/forms/forms.routing';

import {ExtendedFormsComponent} from 'src/app/old/forms/extendedforms/extendedforms.component';
import {RegularFormsComponent} from 'src/app/old/forms/regularforms/regularforms.component';
import {ValidationFormsComponent} from 'src/app/old/forms/validationforms/validationforms.component';
import {WizardComponent} from 'src/app/old/forms/wizard/wizard.component';
import {FieldErrorDisplayComponent} from 'src/app/old/forms/validationforms/field-error-display/field-error-display.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormsRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule
    ],
    declarations: [
        ExtendedFormsComponent,
        RegularFormsComponent,
        ValidationFormsComponent,
        WizardComponent,
        FieldErrorDisplayComponent
    ]
})

export class Forms {
}
