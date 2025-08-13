from django.shortcuts import render
from .serializer import UserSerializer
from rest_framework import viewsets
from .models import User
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
