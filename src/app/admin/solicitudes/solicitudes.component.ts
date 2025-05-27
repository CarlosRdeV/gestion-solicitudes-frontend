import { Component, OnInit } from '@angular/core';
import { SolicitudService, SolicitudDTO } from '../../shared/solicitud.service';

@Component({
  selector: 'app-admin-solicitudes',
  templateUrl: './solicitudes.component.html',
  standalone: false,
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  solicitudes: SolicitudDTO[] = [];

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudService.obtenerTodas()
      .subscribe(data => this.solicitudes = data);
  }

  aprobar(id: number): void {
    this.solicitudService.aprobarSolicitud(id)
      .subscribe(() => this.cargarSolicitudes());
  }

  rechazar(id: number): void {
    this.solicitudService.rechazarSolicitud(id)
      .subscribe(() => this.cargarSolicitudes());
  }
}
