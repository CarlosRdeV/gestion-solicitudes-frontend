import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { AuthService } from '../shared/auth.service';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
    canActivate: [() => inject(AuthService).esAdmin()]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
