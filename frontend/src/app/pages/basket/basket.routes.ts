import { Routes } from '@angular/router';

export const basketRoutes: Routes = [
  {
    path: 'basket',
    loadComponent: () => import('./basket').then((c) => c.Basket),
  },
];
