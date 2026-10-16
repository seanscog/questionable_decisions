import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Admin } from './components/admin/admin';
import { Login } from './components/login/login';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: Admin,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: Login,
  },
  {
    path: '**',
    component: NotFound,
  },
];
