import { Routes } from '@angular/router';
import { catalogRoutes } from './pages/catalog/catalog.routes';
import { basketRoutes } from './pages/basket/basket.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((l) => l.Layout),
    children: [
      ...catalogRoutes,
      ...basketRoutes,
      {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full',
      },
    ],
  },
];
