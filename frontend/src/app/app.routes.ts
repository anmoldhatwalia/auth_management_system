import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Layout } from './layout/layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'

    },

    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then((m) => m.Login)
    },

    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then((m) => m.Register)
    },

    
    {
        path: 'forgotpassword',
        loadComponent: () => import('./pages/forgot-password/forgot-password').then((m) => m.ForgotPassword)
    },
    
    {
        path: 'reset-password/:token',
        loadComponent: () => import('./pages/reset-password/reset-password').then((m) => m.ResetPassword)
    },
    
    {
    path: '',
    component: Layout,

    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard')
          .then(m => m.Dashboard)
      },

      {
        path: 'analytics',
        loadComponent: () =>
          import('./pages/analytics/analytics')
          .then(m => m.Analytics)
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users')
          .then(m => m.Users)
      },

      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings')
          .then(m => m.Settings)
      }

    ]
  },

];
