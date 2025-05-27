import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SolicitudDTO {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  usuarioId: number;
}

export interface SolicitudRequestDTO {
  titulo: string;
  descripcion: string;
  usuarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Usuario
  crearSolicitud(data: SolicitudRequestDTO): Observable<SolicitudDTO> {
    return this.http.post<SolicitudDTO>(`${this.apiUrl}/solicitudes`, data);
  }

  obtenerSolicitudesUsuario(idUsuario: number): Observable<SolicitudDTO[]> {
    return this.http.get<SolicitudDTO[]>(`${this.apiUrl}/solicitudes/usuario/${idUsuario}`);
  }

  // Admin
  obtenerTodas(): Observable<SolicitudDTO[]> {
    return this.http.get<SolicitudDTO[]>(`${this.apiUrl}/admin/solicitudes`);
  }

  aprobarSolicitud(id: number): Observable<SolicitudDTO> {
    return this.http.put<SolicitudDTO>(`${this.apiUrl}/admin/solicitudes/${id}/aprobar`, {});
  }

  rechazarSolicitud(id: number): Observable<SolicitudDTO> {
    return this.http.put<SolicitudDTO>(`${this.apiUrl}/admin/solicitudes/${id}/rechazar`, {});
  }
}
