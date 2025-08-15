from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'done')
        # Excluimos el campo 'user' ya que se asigna automáticamente
