from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializer import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Retorna solo las tareas del usuario autenticado"""
        return Task.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Asigna automáticamente el usuario autenticado al crear una tarea"""
        serializer.save(user=self.request.user)
