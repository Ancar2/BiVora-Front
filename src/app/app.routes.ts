import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Inicio } from './components/dashboard/inicio/inicio';
import { Estaciones } from './components/dashboard/estaciones/estaciones';
import { Alquiler } from './components/alquiler/alquiler';
import { Register } from './components/register/register';
import { Administracion } from './components/administracion/administracion';
import { InicioAdmin } from './components/administracion/inicio-admin/inicio-admin';
import { EstacionesAdmin } from './components/administracion/estaciones-admin/estaciones-admin';
import { BicicletasAdmin } from './components/administracion/bicicletas-admin/bicicletas-admin';

export const routes: Routes = [
  {
    path: 'register',
    component: Register
  },

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
  },
  {
    path: 'administracion',
    component: Administracion,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        component: InicioAdmin
      },
      {
        path: 'estaciones',
        component: EstacionesAdmin
      },
       {
        path: 'bicicletas',
        component: BicicletasAdmin
      },
    ]
  },



];
