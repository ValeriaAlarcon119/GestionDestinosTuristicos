# 🌍 Gestión de Destinos Turísticos

![Estado del Proyecto](https://img.shields.io/badge/Estado-Producci%C3%B3n-success?style=for-the-badge)
![Tecnología](https://img.shields.io/badge/.NET_8-512BD4?style=for-the-badge&logo=dotnet)
![Frontend](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)

Sistema completo de gestión para destinos turísticos que permite el control de información, precios y disponibilidad en tiempo real. Este proyecto utiliza una arquitectura desacoplada con un API backend robusto y una interfaz frontend moderna.

---

## 🚀 Ver en Producción
Puedes acceder a la versión desplegada aquí:
🔗 **[https://gestiondestinosturisticos.netlify.app/destinations](https://gestiondestinosturisticos.netlify.app/destinations)**

---

## 🛠️ Tecnologías y Versiones

### **Backend (API)**
*   **Lenguaje:** C# 12
*   **Framework:** ASP.NET Core 8.0 (Versión LTS)
*   **Arquitectura:** Minimal APIs
*   **Gestión de Datos:** Repositorio en memoria (Listas)
*   **CORS:** Configuración multi-plataforma (Allow Any Origin)
*   **Herramientas:** 
    *   `Swashbuckle.AspNetCore`: Documentación interactiva con Swagger.
    *   Contenedores: **Docker** para despliegue estandarizado en la nube.

### **Frontend (UI)**
*   **Framework:** React 18
*   **Bundler:** Vite
*   **Lenguaje:** TypeScript
*   **Estilos:** CSS3 nativo (Diseño moderno y responsive)
*   **Peticiones HTTP:** Axios para comunicación asíncrona con la API.

---

## 📋 Estructura del Proyecto

```text
GestionDestinos/
├── HotelBediaX.Api/    # Backend en .NET (Core del sistema)
│   ├── Controllers/   # Endpoints de la API
│   ├── Models/        # Definición de datos (Destino, PagedResult)
│   └── Dockerfile     # Configuración para despliegue en Render
└── frontend/          # Interfaz React + Vite
    ├── src/           # Código fuente (Componentes, API client)
    └── netlify.toml   # Configuración de redirecciones para Netlify
```

---

## ⚙️ Paso a Paso del Despliegue

### **1. Despliegue del Backend (Render)**
1.  Crear un nuevo **Web Service** en Render.
2.  Conectar este repositorio de GitHub.
3.  **Configuración Docker**:
    *   **Context**: `HotelBediaX.Api`
    *   **Dockerfile Path**: `HotelBediaX.Api/Dockerfile`
4.  **Variables de Entorno**:
    *   `ASPNETCORE_ENVIRONMENT`: `Production`

### **2. Despliegue del Frontend (Netlify)**
1.  Importar proyecto desde GitHub.
2.  **Configuración Build**:
    *   **Base directory**: `frontend`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
3.  **Variables de Entorno**:
    *   `VITE_API_URL`: URL de tu backend en Render (ej. `https://xxx.onrender.com/api`)

---

## 📝 Autoría
Este proyecto ha sido desarrollado íntegramente como una solución profesional de gestión.

✨ **Realizado por: Valeria Alarcón Andrade** ✨
