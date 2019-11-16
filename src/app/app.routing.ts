import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {CameraComponent} from 'src/app/pages-blank/camera/camera.component';
import {ListComponent} from 'src/app/pages-blank/list/list.component';

export const AppRoutes: Routes = [
	{
		path: '',
		redirectTo: 'camera',
		pathMatch: 'full',
	},
	{
		path: 'dashboard',
		component: AdminLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: './dashboard/dashboard.module#DashboardModule',
			},
		],
	},
	{
		path: 'pages',
		component: AuthLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: './pages/pages.module#PagesModule',
			},
		],
	},
	{
		path: 'camera',
		component: CameraComponent,
	},
	{
		path: 'list',
		component: ListComponent,
	},
];
