import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Home | Prarthana Digital Marketing',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    title: 'About Us | Prarthana Digital Marketing',
    loadComponent: () =>
      import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'services',
    title: 'Services | Prarthana Digital Marketing',
    children: [],
  },
  {
    path: 'portfolio',
    title: 'Portfolio | Prarthana Digital Marketing',
    children: [],
  },
  {
    path: 'contact',
    title: 'Contact Us | Prarthana Digital Marketing',
    children: [],
  },
  {
    path: 'admin',
    title: 'Admin | Prarthana Digital Marketing',
    children: [],
  },
  {
    path: '**',
    redirectTo: '',
  },
];