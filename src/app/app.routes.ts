import { Routes } from '@angular/router';
import { authGuard } from '../app/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [authGuard],
  },

  {
    path: 'add-note',
    loadComponent: () => import('./pages/add-note/add-note.page').then(m => m.AddNotePage),
    canActivate: [authGuard],
  },

  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/edit/edit.page').then(m => m.EditNotePage),
    canActivate: [authGuard],
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage),
  },

  { path: '**', redirectTo: 'home' },
];
