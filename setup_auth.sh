#!/bin/bash

# Script para ejecutar migraciones de Django

echo "Activando entorno virtual..."
source myenv/bin/activate

echo "Ejecutando migraciones..."
python manage.py makemigrations
python manage.py migrate

echo "Creando tokens para usuarios existentes..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()
for user in User.objects.all():
    Token.objects.get_or_create(user=user)
    print(f'Token creado para {user.username}')
"

echo "¡Migraciones completadas!"
