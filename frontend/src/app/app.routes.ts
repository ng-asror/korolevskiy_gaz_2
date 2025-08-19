import { Routes } from '@angular/router';
import { catalogRoutes } from './modules/catalog/catalog.routes';
import { basketRoutes } from './modules/basket/basket.routes';
import { ordersRoutes } from './modules/orders/orders.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout').then((l) => l.Layout),
    children: [
      ...catalogRoutes,
      ...basketRoutes,
      ...ordersRoutes,
      {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full',
      },
    ],
  },
];
