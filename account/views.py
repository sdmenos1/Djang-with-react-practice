from django.shortcuts import render
from .serializer import UserSerializer, UserRegistrationSerializer, UserLoginSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from .models import User

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """Registro de nuevos usuarios"""
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key,
                'message': 'Usuario creado exitosamente'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Inicio de sesión"""
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key,
                'message': 'Inicio de sesión exitoso'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Cerrar sesión"""
    try:
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({
            'message': 'Sesión cerrada exitosamente'
        }, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({
            'error': 'Token no encontrado'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    """Obtener perfil del usuario autenticado"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
