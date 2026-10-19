import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Admin } from './components/admin/admin';
import { Login } from './components/login/login';
import { NotFound } from './components/not-found/not-found';
import { FormEdit } from './components/form-edit/form-edit';
import { Questionable, schemaResolver } from './components/questionable/questionable';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';

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
    path: 'profile',
    pathMatch: 'full',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: Login,
  },
  {
    path: 'form/new',
    pathMatch: 'full',
    component: FormEdit,
  },
  {
    path: 'form/:id',
    pathMatch: 'full',
    component: Questionable,
    resolve: {
      schema: schemaResolver,
    },
  },
  {
    path: '**',
    component: NotFound,
  },
];
