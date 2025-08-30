import { Routes } from '@angular/router';

export const basketRoutes: Routes = [
  {
    path: 'basket',
    loadComponent: () => import('./basket').then((c) => c.Basket),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages').then((c) => c.Products),
      },
      {
        path: 'oformit',
        loadComponent: () => import('./pages').then((c) => c.Oformit),
      },
    ],
  },
];
