import { Routes } from '@angular/router';
import { catalogRoutes } from './pages/catalog/catalog.routes';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./layout/layout').then((l) => l.Layout),
		children: [
			...catalogRoutes,
			{
				path: '',
				redirectTo: 'catalog',
				pathMatch: 'full'
			},
		],
	},
];
