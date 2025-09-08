import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Inicio } from './components/dashboard/inicio/inicio';
import { Estaciones } from './components/dashboard/estaciones/estaciones';
import { Alquiler } from './components/alquiler/alquiler';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        component: Inicio
      },
      {
        path: 'estaciones',
        component: Estaciones
      },
       {
        path: 'alquiler',
        component: Alquiler
      },
    ],
  }

];
