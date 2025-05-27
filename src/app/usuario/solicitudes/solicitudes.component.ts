import { Component, OnInit } from '@angular/core';
import { SolicitudService, SolicitudDTO, SolicitudRequestDTO } from '../../shared/solicitud.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  standalone: false,
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  solicitudes: SolicitudDTO[] = [];
  nuevaSolicitud: SolicitudRequestDTO = {
    titulo: '',
    descripcion: '',
    usuarioId: 1  // Simulación de usuario
  };

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudService.obtenerSolicitudesUsuario(this.nuevaSolicitud.usuarioId)
      .subscribe(data => this.solicitudes = data);
  }

  crearSolicitud(): void {
    if (!this.nuevaSolicitud.titulo || !this.nuevaSolicitud.descripcion) return;

    this.solicitudService.crearSolicitud(this.nuevaSolicitud)
      .subscribe(() => {
        this.nuevaSolicitud.titulo = '';
        this.nuevaSolicitud.descripcion = '';
        this.cargarSolicitudes();
      });
  }
}
