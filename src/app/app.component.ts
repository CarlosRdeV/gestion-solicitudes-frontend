import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet, RouterLink],
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent {
rol: string;

constructor(private authService: AuthService) {
  this.rol = this.authService.getRol();
}

cambiarRol(): void {
const nuevoRol = this.authService.getRol() === 'ADMIN' ? 'USUARIO' : 'ADMIN';
this.authService.setRol(nuevoRol);
this.rol = nuevoRol;
}
}
