
import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

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
    loadComponent: () =>
      import('./features/services/services').then((m) => m.Services),
  },
  {
    path: 'portfolio',
    title: 'Portfolio | Prarthana Digital Marketing',
    loadComponent: () =>
      import('./features/portfolio/portfolio').then((m) => m.Portfolio),
  },
  {
    path: 'contact',
    title: 'Contact Us | Prarthana Digital Marketing',
    loadComponent: () =>
      import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        title: 'Admin Login | Prarthana Digital Marketing',
        loadComponent: () =>
          import('./features/admin/login/login').then((m) => m.Login),
      },
      {
        path: 'dashboard',
        title: 'Admin Dashboard | Prarthana Digital Marketing',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard').then(
            (m) => m.Dashboard
          ),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
