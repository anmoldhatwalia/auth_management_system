import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'

    },
    
    {
        path:'login',
        loadComponent:()=>import('./pages/login/login').then((m)=>m.Login)
    },
    {
        path:'register',
        loadComponent:()=>import('./pages/register/register').then((m)=>m.Register)
    },
    {
        path:'dashboard',
        loadComponent: ()=> import('./pages/dashboard/dashboard').then((m)=>m.Dashboard),canActivate:[authGuard]
    },
    {
        path:'forgotpassword',
        loadComponent:()=> import('./pages/forgot-password/forgot-password').then((m)=>m.ForgotPassword)
    },
    {
        path:'reset-password/:token',
        loadComponent:()=> import('./pages/reset-password/reset-password').then((m)=>m.ResetPassword)
    }

];
