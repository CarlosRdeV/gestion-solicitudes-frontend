import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService, SolicitudDTO, SolicitudRequestDTO } from './solicitud.service';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService]
    });
    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones sin resolver
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener solicitudes de un usuario', () => {
    const mockResponse: SolicitudDTO[] = [
      { id: 1, titulo: 'Test', descripcion: 'desc', estado: 'PENDIENTE', usuarioId: 100 }
    ];

    service.obtenerSolicitudesUsuario(100).subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].titulo).toBe('Test');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/solicitudes/usuario/100');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería crear una nueva solicitud', () => {
  const request: SolicitudRequestDTO = {
    titulo: 'Nueva',
    descripcion: 'algo',
    usuarioId: 101
  };

  service.crearSolicitud(request).subscribe(res => {
    expect(res).toBeNull(); // El servidor devuelve null
  });

  const req = httpMock.expectOne('http://localhost:8080/api/solicitudes');
  expect(req.request.method).toBe('POST');
  expect(req.request.body.titulo).toBe('Nueva');
  req.flush(null); // Simulamos respuesta vacía
});
});
