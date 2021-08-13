import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from '../containers/private/private.component';
import { PublicComponent } from '../containers/public/public.component';

const routes: Routes = [
  {
    path: 'login',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule),
      },
    ],
  },
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'config',
        loadChildren: () => import('../modules/rrhh/rrhh.module').then(m => m.RrhhModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
