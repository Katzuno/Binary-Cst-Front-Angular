import {Routes} from '@angular/router';

import {ExtendedFormsComponent} from 'src/app/old/forms/extendedforms/extendedforms.component';
import {RegularFormsComponent} from 'src/app/old/forms/regularforms/regularforms.component';
import {ValidationFormsComponent} from 'src/app/old/forms/validationforms/validationforms.component';
import {WizardComponent} from 'src/app/old/forms/wizard/wizard.component';

export const FormsRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'regular',
            component: RegularFormsComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'extended',
            component: ExtendedFormsComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'validation',
            component: ValidationFormsComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'wizard',
            component: WizardComponent
        }]
    }
];
