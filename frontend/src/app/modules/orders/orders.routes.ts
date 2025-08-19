import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: 'orders',
    loadComponent: () => import('./orders').then((c) => c.Orders),
  },
];
