# BiVora Front

Aplicación web en Angular para el sistema de alquiler de bicicletas BiVora. Consume la API [BiVora](https://github.com/Ancar2/BiVora).

## Funcionalidades

- Registro e inicio de sesión de usuarios (autenticación con JWT).
- Dashboard de usuario con consulta de estaciones y alquiler de bicicletas.
- Panel de administración para gestionar estaciones y bicicletas.

## Tecnologías

Angular 20 · TypeScript · Bootstrap · Bootstrap Icons · RxJS · jwt-decode

## Requisitos

- Node.js (versión LTS reciente)
- Angular CLI (`npm install -g @angular/cli`) o usar `npx ng`
- La API [BiVora](https://github.com/Ancar2/BiVora) en ejecución

## Instalación

```bash
git clone https://github.com/Ancar2/BiVora-Front.git
cd BiVora-Front
npm install
```

## Configuración

La URL de la API se define en `src/app/environments/api_url.service.ts`. Cámbiala por la dirección de tu instancia de la API, terminada en `/api`.

## Ejecución

```bash
npm start        # ng serve, disponible en http://localhost:4200/
npm run build    # compilación de producción
npm test         # pruebas unitarias (Karma + Jasmine)
```

## Estructura del proyecto

```text
src/app/
├── components/
│   ├── login/ · register/
│   ├── dashboard/        # inicio y estaciones del usuario
│   ├── alquiler/
│   └── administracion/   # inicio, estaciones y bicicletas (admin)
├── services/             # auth, token, user, estaciones, bicicletas, alquiler
└── environments/         # URL de la API
```

## Autor

Andrés Cárdenas ([Ancar](https://github.com/Ancar2)) · [cardenaslabs.com](https://cardenaslabs.com/)
