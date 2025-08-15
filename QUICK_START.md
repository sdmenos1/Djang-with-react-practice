# 🚀 Inicio Rápido - Sistema de Autenticación

## ✅ ¿Qué se ha implementado?

Tu proyecto ahora tiene un **sistema completo de autenticación** con las siguientes funcionalidades:

### 🔐 Backend (Django)
- ✅ Modelo de usuario personalizado con campos adicionales
- ✅ Sistema de tokens para autenticación
- ✅ Endpoints de registro, login, logout y perfil  
- ✅ Las tareas ahora están asociadas a usuarios específicos
- ✅ Rutas protegidas que requieren autenticación

### 🎨 Frontend (React)
- ✅ Páginas de Login y Registro con validación
- ✅ Navegación dinámica (cambia según autenticación)
- ✅ Rutas protegidas con redirección automática
- ✅ Página de perfil de usuario
- ✅ Gestión automática de tokens
- ✅ Notificaciones toast para feedback

## 🏃‍♂️ Cómo ejecutar el proyecto

### 1. Configurar el backend
```bash
# Navegar al directorio principal
cd react-with-django

# Activar entorno virtual
source myenv/bin/activate

# Ejecutar migraciones
python manage.py makemigrations
python manage.py migrate  

# Iniciar servidor Django
python manage.py runserver
```

### 2. Configurar el frontend
```bash
# En otra terminal, navegar al frontend
cd react-with-django/vite-project

# Instalar dependencias (si no están instaladas)
npm install

# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Iniciar servidor de desarrollo
npm run dev
```

## 🎯 URLs importantes

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/account/docs/

## 🔄 Flujo de uso

1. **Accede al frontend**: http://localhost:5173
2. **Regístrate**: Crea una nueva cuenta
3. **Inicia sesión**: Usa tus credenciales  
4. **Gestiona tareas**: Solo verás tus tareas personales
5. **Ve tu perfil**: Información de tu cuenta

## 📱 Páginas disponibles

- `/login` - Iniciar sesión
- `/register` - Crear cuenta
- `/tasks` - Lista de tareas (protegida)
- `/task-form` - Crear/editar tarea (protegida)  
- `/profile` - Perfil de usuario (protegida)

## 🔑 API Endpoints

### Autenticación
- `POST /account/api/register/` - Registro
- `POST /account/api/login/` - Login
- `POST /account/api/logout/` - Logout
- `GET /account/api/profile/` - Perfil

### Tareas (requieren autenticación)
- `GET /tasks/api/v1/tasks/` - Listar tareas
- `POST /tasks/api/v1/tasks/` - Crear tarea
- `PUT /tasks/api/v1/tasks/{id}/` - Actualizar tarea
- `DELETE /tasks/api/v1/tasks/{id}/` - Eliminar tarea

## 🐛 Si algo no funciona

### Error CORS
Verifica que Django esté ejecutándose y que `http://localhost:5173` esté en `CORS_ALLOWED_ORIGINS`

### Error 401 - No autorizado  
- Asegúrate de estar logueado
- Verifica que el token se esté enviando correctamente

### Frontend no conecta
- Confirma que Django esté en puerto 8000
- Revisa las URLs de la API en los archivos `.api.ts`

### Problemas con migraciones
```bash
python manage.py makemigrations account
python manage.py makemigrations tasks
python manage.py migrate
```

## 🎉 ¡Listo para usar!

Tu sistema de autenticación está **completamente funcional**. Ahora puedes:

1. ✅ Registrar nuevos usuarios
2. ✅ Autenticar usuarios existentes  
3. ✅ Proteger rutas y vistas
4. ✅ Gestionar tareas por usuario
5. ✅ Ver perfiles de usuario

## 📚 Próximos pasos

Si quieres expandir el sistema, considera:

- 🔐 Implementar refresh tokens
- 📧 Verificación por email
- 🔑 Recuperación de contraseña
- 👥 Roles y permisos de usuario
- 📊 Dashboard de administración

¡Disfruta de tu nueva aplicación con autenticación completa! 🚀
