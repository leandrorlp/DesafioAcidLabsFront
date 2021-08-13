import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { UsuariosComponent } from '../components/admin-usuarios/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrhhRoutingModule { }
