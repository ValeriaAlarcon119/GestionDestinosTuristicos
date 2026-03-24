# 🏨 HotelBediaX - Sistema de Gestión de Destinos

Bienvenido a **HotelBediaX**, una aplicación web moderna diseñada para la gestión eficiente de destinos turísticos. Este proyecto es una solución full-stack que combina la potencia de **.NET 8** en el servidor con la agilidad de **React** y **Vite** en la interfaz de usuario.

---

## 🚀 Descripción del Proyecto

HotelBediaX permite centralizar toda la información de destinos de viaje, permitiendo a los administradores visualizar, buscar, añadir, editar y eliminar destinos de forma sencilla e intuitiva. Su diseño está enfocado en la usabilidad y la rapidez de respuesta.

### Principales Funcionalidades
-   **Dashboard de Destinos**: Listado paginado de todos los destinos activos e inactivos.
-   **Búsqueda Dinámica**: Encuentra destinos por nombre, país o ciudad en tiempo real.
-   **Gestión CRUD Completa**:
    -   Crear nuevos destinos con descripción, precio y valoración.
    -   Editar información existente.
    -   Activar o desactivar destinos.
    -   Eliminar destinos con confirmación.
-   **Documentación Interactiva**: Backend documentado íntegramente con Swagger.

---

## 🛠️ Tecnologías y Arquitectura

### 🔙 Backend (.NET 8.0)
El servidor está construido bajo una arquitectura de **Minimal API**, priorizando la simplicidad y el rendimiento.

-   **Framework**: ASP.NET Core 8.0.
-   **Almacenamiento**: Utiliza un **Repositorio en Memoria** (`InMemoryDestinationRepository`), ideal para demostraciones rápidas y pruebas sin configuraciones externas de DB.
-   **Swagger/OpenAPI**: Integración completa para pruebas de endpoints y documentación técnica.
-   **CORS**: Configurado para permitir comunicación segura con el frontend.
-   **Estructura**:
    -   `Models/`: Definiciones de datos (`Destination`, `PagedResult`).
    -   `Repositories/`: Lógica de acceso a datos desacoplada mediante interfaces.
    -   `Program.cs`: Configuración de servicios y definición de rutas.

### 🎨 Frontend (React + Vite + TypeScript)
Una interfaz de usuario moderna, reactiva y totalmente tipada para mayor robustez.

-   **Core**: React 19 + TypeScript.
-   **Herramientas de Construcción**: Vite 7.x para transpilación ultra rápida.
-   **Comunicación**: Axios para peticiones HTTP eficientes al backend.
-   **Ruteo**: React Router para navegación fluida entre módulos (Destinos, Próximamente: Reservas, Clientes).
-   **Estilos**: Vanilla CSS con variables personalizadas para un diseño "Dark Mode" premium y moderno.
-   **Estructura**:
    -   `src/api/`: Cliente API centralizado.
    -   `src/features/destinations/`: Lógica, componentes y estilos específicos del módulo de destinos.
    -   `src/layout/`: Estructura principal de la app (Sidebar, Topbar).

---

## 🏗️ Cómo ejecutar el proyecto

### 1. Requisitos previos
-   [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
-   [Node.js](https://nodejs.org/) (v18 o superior recomendado)
-   NPM (incluido con Node.js)

### 2. Ejecutar el Backend
1. Abre una terminal en `backend/`.
2. Ejecuta:
   ```powershell
   dotnet run
   ```
3. Verifica la conexión en: [http://localhost:5210/swagger](http://localhost:5210/swagger)

### 3. Ejecutar el Frontend
1. Abre una terminal en `frontend/`.
2. Instala dependencias:
   ```powershell
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```powershell
   npm run dev
   ```
4. Accede desde tu navegador: [http://localhost:5173](http://localhost:5173)

---

## 📂 Estructura de Carpetas
```text
HotelBediaX-Suite/
├── HotelBediaX.Api/        # Antes 'backend' - Proyecto ASP.NET Core
│   ├── Models/             # Clases de Dominio
│   ├── Repositories/       # Manejo de datos (In-memory)
│   └── Program.cs          # Punto de entrada
├── frontend/               # Proyecto React (HotelBediaX.Web)
│   ├── src/
│   │   ├── api/            # Peticiones al backend
│   │   ├── features/       # Módulos del negocio
│   │   └── layout/         # Componentes estructurales
│   └── package.json        # Configuración de dependencias
└── README.md               # Documentación general
```

---

## 🎯 Objetivo de la Prueba
Este proyecto demuestra la capacidad para construir una aplicación modular, escalable y con foco en la calidad del código, cubriendo tanto lógica compleja en el servidor como una experiencia de usuario fluida en el navegador.
