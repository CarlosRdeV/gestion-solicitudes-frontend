import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { FormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [SolicitudesComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule
  ]
})
export class UsuarioModule { }
