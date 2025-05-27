import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería devolver USUARIO por defecto', () => {
    expect(service.getRol()).toBe('USUARIO');
  });

  it('debería cambiar el rol a ADMIN', () => {
    service.setRol('ADMIN');
    expect(service.getRol()).toBe('ADMIN');
  });

  it('debería reconocer el rol ADMIN', () => {
    service.setRol('ADMIN');
    expect(service.esAdmin()).toBeTrue();
    expect(service.esUsuario()).toBeFalse();
  });

  it('debería reconocer el rol USUARIO', () => {
    service.setRol('USUARIO');
    expect(service.esUsuario()).toBeTrue();
    expect(service.esAdmin()).toBeFalse();
  });
});