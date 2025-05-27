import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private rolActual: 'USUARIO' | 'ADMIN' = 'USUARIO';

  constructor() {
    const guardado = localStorage.getItem('rol');
    if (guardado === 'ADMIN' || guardado === 'USUARIO') {
      this.rolActual = guardado;
    }
  }

  getRol(): 'USUARIO' | 'ADMIN' {
    return this.rolActual;
  }

  setRol(rol: 'USUARIO' | 'ADMIN') {
    this.rolActual = rol;
    localStorage.setItem('rol', rol);
  }

  esAdmin(): boolean {
    return this.rolActual === 'ADMIN';
  }

  esUsuario(): boolean {
    return this.rolActual === 'USUARIO';
  }
}

