# Sistema de Autenticación - React + Django

Este proyecto implementa un sistema completo de autenticación con React (Vite) como frontend y Django como backend.

## 🚀 Funcionalidades Implementadas

### Backend (Django)
- ✅ Modelo de usuario personalizado con campos adicionales
- ✅ Autenticación basada en tokens (DRF Token)
- ✅ Endpoints de registro, login, logout y perfil
- ✅ Vistas protegidas que requieren autenticación
- ✅ Filtrado de tareas por usuario autenticado
- ✅ Validación de contraseñas seguras
- ✅ Manejo de errores y respuestas consistentes

### Frontend (React + TypeScript)
- ✅ Context API para manejo de estado de autenticación
- ✅ Páginas de Login y Registro con validación
- ✅ Rutas protegidas con redirección automática
- ✅ Navegación dinámica según estado de autenticación
- ✅ Interceptores de Axios para manejo de tokens
- ✅ Página de perfil de usuario
- ✅ Notificaciones toast para feedback
- ✅ Diseño responsive con Tailwind CSS

## 🛠️ Configuración e Instalación

### 1. Backend (Django)

```bash
# Navegar al directorio del proyecto
cd react-with-django

# Activar entorno virtual
source myenv/bin/activate

# Ejecutar migraciones
python manage.py makemigrations
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Iniciar servidor de desarrollo
python manage.py runserver
```

### 2. Frontend (Vite + React)

```bash
# Navegar al directorio del frontend
cd vite-project

# Instalar dependencias
npm install

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Iniciar servidor de desarrollo
npm run dev
```

## 📡 Endpoints de la API

### Autenticación
- `POST /account/api/register/` - Registro de usuarios
- `POST /account/api/login/` - Inicio de sesión
- `POST /account/api/logout/` - Cerrar sesión
- `GET /account/api/profile/` - Obtener perfil del usuario

### Tareas (requieren autenticación)
- `GET /tasks/api/v1/tasks/` - Listar tareas del usuario
- `POST /tasks/api/v1/tasks/` - Crear nueva tarea
- `GET /tasks/api/v1/tasks/{id}/` - Obtener tarea específica
- `PUT /tasks/api/v1/tasks/{id}/` - Actualizar tarea
- `DELETE /tasks/api/v1/tasks/{id}/` - Eliminar tarea

## 🔒 Sistema de Autenticación

### Cómo funciona:

1. **Registro**: El usuario se registra con username, email, nombres, apellidos y contraseña
2. **Login**: Se validan las credenciales y se genera un token de autenticación
3. **Almacenamiento**: El token se guarda en localStorage del navegador
4. **Requests**: Todas las peticiones incluyen el token en el header `Authorization: Token {token}`
5. **Protección**: Las rutas y vistas verifican la autenticación automáticamente
6. **Logout**: Se elimina el token del servidor y del localStorage

### Flujo de autenticación:

```
Frontend                Backend
   |                       |
   |-- POST /register ----->|
   |<-- {user, token} ------|
   |                       |
   |-- POST /login -------->|
   |<-- {user, token} ------|
   |                       |
   |-- GET /tasks ----------|
   |   (with token)         |
   |<-- [user's tasks] -----|
   |                       |
   |-- POST /logout ------->|
   |<-- {message} ----------|
```

## 🎨 Interfaz de Usuario

### Páginas principales:
- **Login**: Formulario de inicio de sesión
- **Registro**: Formulario de registro con validación
- **Tareas**: Lista de tareas del usuario autenticado
- **Nueva Tarea**: Formulario para crear/editar tareas
- **Perfil**: Información del usuario autenticado

### Componentes clave:
- **Navigation**: Navegación dinámica según autenticación
- **ProtectedRoute**: Wrapper para rutas que requieren autenticación
- **AuthContext**: Context para manejo global del estado de autenticación

## 🔧 Próximos pasos recomendados

### Mejoras de seguridad:
1. Implementar refresh tokens para mayor seguridad
2. Añadir rate limiting a los endpoints de autenticación
3. Implementar verificación por email
4. Añadir autenticación de dos factores (2FA)

### Mejoras de funcionalidad:
1. Página de edición de perfil
2. Cambio de contraseña
3. Recuperación de contraseña
4. Filtros y búsqueda en tareas
5. Paginación en listas largas

### Mejoras técnicas:
1. Tests unitarios y de integración
2. Docker para containerización
3. CI/CD pipeline
4. Logging y monitoreo
5. Base de datos PostgreSQL para producción

## 🐛 Solución de problemas comunes

### Error CORS:
Verificar que `http://localhost:5173` esté en `CORS_ALLOWED_ORIGINS` en Django settings.

### Error 401 Unauthorized:
- Verificar que el token esté siendo enviado correctamente
- Comprobar que el usuario esté autenticado
- Revisar que el token no haya expirado

### Problemas con migraciones:
```bash
python manage.py makemigrations account
python manage.py makemigrations tasks  
python manage.py migrate
```

### Frontend no conecta con backend:
- Verificar que Django esté corriendo en puerto 8000
- Comprobar las URLs de la API en los archivos `.api.ts`
- Revisar la configuración de CORS

## 📚 Tecnologías utilizadas

**Backend:**
- Django 5.2.5
- Django REST Framework
- SQLite (desarrollo)
- Token Authentication

**Frontend:**
- React 19.1.1
- TypeScript
- Vite 7.1.0
- React Router DOM 7.8.0
- React Hook Form 7.62.0
- Axios 1.11.0
- React Hot Toast 2.5.2
- Tailwind CSS

¡El sistema de autenticación está listo para usar! 🎉
