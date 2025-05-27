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

## 💡 Diferencia entre AuthService y Guard

* `AuthService`: es un **servicio compartido** que mantiene y expone el rol actual (ADMIN o USUARIO). También permite cambiarlo o consultarlo desde cualquier parte de la app.

  * Ejemplo: `authService.getRol()` devuelve el rol actual.
  * Simula un sistema de autenticación sin login real.

* `authGuard`: es un **guardia de ruta** (Route Guard) que usa el `AuthService` para decidir si se puede navegar a una ruta específica.

  * Si el rol no coincide con el esperado, bloquea el acceso o redirige.
  * Se configura en `app.routes.ts` con `canActivate`.

**En resumen:**

* `AuthService` mantiene el estado
* `authGuard` actúa como filtro al navegar

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

## 📥 ¿Cuándo se ejecuta la petición HTTP en Angular?

Los métodos como `this.http.get(...)` devuelven un **Observable**. Ese observable **no ejecuta la petición HTTP hasta que se le hace `.subscribe()`**. Por eso decimos que los observables de Angular son **“fríos”**.

```ts
const obs$ = this.http.get('/api/datos'); // No hace nada aún
obs$.subscribe(data => console.log(data)); // Aquí sí se ejecuta la petición
```

### 🛠️ ¿Qué hace `.subscribe()`?

```ts
observable.subscribe({
  next: data => { ... },     // cuando llegan los datos
  error: err => { ... },     // si hay error
  complete: () => { ... }    // cuando termina
});
```

### 🧩 Otras formas de consumir observables

| Método             | ¿Cuándo usarlo?                           |
| ------------------ | ----------------------------------------- |
| `.subscribe()`     | Para ejecutar código al recibir datos     |
| `async pipe`       | Mostrar datos directamente en el template |
| `firstValueFrom()` | Convertir a promesa y usar con `await`    |
| `.pipe(...)`       | Transformar o combinar streams con RxJS   |

### ✅ Ejemplo con `async pipe` en el template

```ts
datos$ = this.http.get('/api/datos');
```

```html
<ul>
  <li *ngFor="let item of datos$ | async">{{ item.nombre }}</li>
</ul>
```

Esta es la forma recomendada para mostrar listas u observables simples sin necesidad de `.subscribe()` manual en el componente.

---

## 🧪 Pruebas

Actualmente se han implementado pruebas unitarias básicas para:

### 🔹 AuthService

Archivo: `src/app/shared/auth.service.spec.ts`

* Verifica que el servicio se crea correctamente
* Verifica que el rol por defecto es `USUARIO`
* Permite cambiar entre `USUARIO` y `ADMIN`
* Prueba los métodos `esAdmin()` y `esUsuario()`
* Limpia el `localStorage` antes de cada prueba

### 🔹 SolicitudService

Archivo: `src/app/shared/solicitud.service.spec.ts`

* Usa `HttpClientTestingModule` y `HttpTestingController`
* Verifica que se hagan correctamente las llamadas HTTP:

  * `GET /api/solicitudes/usuario/:id`
  * `POST /api/solicitudes`
* Simula respuestas con `.flush()`
* Verifica que no queden peticiones abiertas

🧠 En estas pruebas:

* Se llama al servicio real (`SolicitudService`)
* Se intercepta la petición HTTP con `httpMock.expectOne(...)`
* Luego se responde manualmente usando `flush(...)`
* Así se validan tanto los parámetros de la solicitud como el manejo de la respuesta

Para ejecutar las pruebas:

```bash
ng test
```

---

## 📦 Compilación para producción

```bash
ng build --configuration production
```

Esto genera los archivos en la carpeta `/dist` listos para desplegarse en cualquier servidor.

---

## 📄 Autor: Carlos Rdev

📅 Última actualización: Mayo 2025
