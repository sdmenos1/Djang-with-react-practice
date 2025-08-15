#!/bin/bash

echo "🚀 Configurando el proyecto React + Django con autenticación..."

# Colores para los mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Configurando Backend (Django)...${NC}"

# Verificar si el entorno virtual existe
if [ ! -d "myenv" ]; then
    echo -e "${YELLOW}⚠️  Entorno virtual no encontrado. Créalo ejecutando:${NC}"
    echo "python -m venv myenv"
    exit 1
fi

# Activar entorno virtual
source myenv/bin/activate

echo -e "${GREEN}✅ Entorno virtual activado${NC}"

# Instalar dependencias faltantes si es necesario
pip install djangorestframework-token

# Ejecutar migraciones
echo -e "${BLUE}📝 Ejecutando migraciones...${NC}"
python manage.py makemigrations
python manage.py migrate

# Crear tokens para usuarios existentes
echo -e "${BLUE}🔑 Creando tokens para usuarios existentes...${NC}"
python manage.py shell -c "
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()
users_created = 0
for user in User.objects.all():
    token, created = Token.objects.get_or_create(user=user)
    if created:
        users_created += 1
        print(f'✅ Token creado para {user.username}')
    else:
        print(f'ℹ️  Token ya existe para {user.username}')

print(f'📊 Tokens creados para {users_created} usuarios')
"

echo -e "${BLUE}📦 Configurando Frontend (React + Vite)...${NC}"

# Cambiar al directorio del frontend
cd vite-project

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Instalando dependencias de Node.js...${NC}"
    npm install
fi

# Instalar Tailwind CSS si no está instalado
if [ ! -f "tailwind.config.js" ]; then
    echo -e "${BLUE}🎨 Instalando Tailwind CSS...${NC}"
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
fi

echo -e "${GREEN}✅ Configuración completada!${NC}"
echo ""
echo -e "${YELLOW}🚀 Para iniciar los servidores:${NC}"
echo ""
echo -e "${BLUE}Backend (Django):${NC}"
echo "cd $(pwd)/.."
echo "source myenv/bin/activate"
echo "python manage.py runserver"
echo ""
echo -e "${BLUE}Frontend (React):${NC}"
echo "cd $(pwd)"
echo "npm run dev"
echo ""
echo -e "${GREEN}📖 Lee el archivo AUTH_README.md para más información!${NC}"
