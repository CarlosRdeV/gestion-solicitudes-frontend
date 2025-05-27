# Frontend - GestionSolicitudes

Este frontend fue desarrollado con **Angular 16+** y forma parte del proyecto completo de "GestionSolicitudes". Se conecta al backend construido en Spring Boot y permite simular roles, visualizar solicitudes y realizar acciones como aprobarlas o filtrarlas por estado.

---

## ⚙️ Tecnologías usadas

* Angular CLI: 16+
* Node.js: 18+
* TypeScript
* Angular Material (opcional)
* Standalone Components

---

## 🚀 Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone <URL-del-repo>
cd gestion-solicitudes-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación

```bash
ng serve
```

La aplicación estará disponible en: [http://localhost:4200](http://localhost:4200)

---

## 👥 Simulación de Roles

En la interfaz principal puedes cambiar entre dos roles:

* `ADMIN`: puede ver todas las solicitudes y aprobarlas.
* `USUARIO`: solo ve sus propias solicitudes.

Esto se gestiona localmente con `AuthService` y `localStorage`. El componente `AppComponent` muestra el rol actual y permite cambiarlo visualmente sin autenticación real.

---

## 🧩 Estructura de módulos y componentes

```text
src/app/
├── shared/                         # Servicios y modelos compartidos
│   ├── auth.service.ts             # Servicio para controlar el rol actual
│   ├── solicitud.service.ts        # Servicio HTTP para consumir la API
│   └── interfaces.ts               # Interfaces y DTOs usados globalmente
│
├── usuario/                        # Módulo para usuarios comunes
│   ├── usuario.module.ts           # Módulo lazy-load
│   └── solicitudes/                # Componente principal para usuarios
│       ├── solicitudes.component.ts
│       ├── solicitudes.component.html
│       └── solicitudes.component.css
│       
├── admin/                          # Módulo para usuarios administradores
│   ├── admin.module.ts             # Módulo lazy-load
│   └── solicitudes/                # Componente para administración
│       ├── solicitudes.component.ts
│       ├── solicitudes.component.html
│       └── solicitudes.component.css
│
├── app.component.ts               # Componente raíz: muestra navegación y cambio de rol
├── app.component.html             # Plantilla base con botones y <router-outlet>
├── app.routes.ts                  # Rutas y guards con lazy loading
└── main.ts                        # Punto de arranque
```

---

## 🛡️ Guards por rol

Se usa un `authGuard` basado en el `AuthService` para restringir acceso a rutas según el rol:

```ts
// app.routes.ts
{
  path: 'admin',
  canActivate: [authGuard],
  data: { rol: 'ADMIN' },
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

El guard redirige automáticamente a la ruta correspondiente si el rol es incorrecto.

---

## 🔗 Comunicación con el backend

El servicio `SolicitudService` se conecta al backend Spring Boot en la ruta `/api/solicitudes` y `/api/admin/solicitudes`. Se usan métodos `GET`, `POST`, y `PUT` según la acción:

* Obtener solicitudes por estado
* Crear nueva solicitud
* Aprobar solicitud

Ejemplo de llamada:

```ts
this.http.get<SolicitudDTO[]>(`/api/admin/solicitudes?estado=PENDIENTE`)
```

---

## 🧪 Pruebas

Actualmente no se han implementado pruebas unitarias o E2E, pero el proyecto está preparado para usar:

* `Karma` + `Jasmine` para pruebas unitarias
* `Protractor` (deprecado) o `Cypress` para E2E

---

## 📦 Compilación para producción

```bash
ng build --configuration production
```

Esto genera los archivos en la carpeta `/dist` listos para desplegarse en cualquier servidor.

---

## 📄 Autor: Carlos Rdev

📅 Última actualización: Mayo 2025
