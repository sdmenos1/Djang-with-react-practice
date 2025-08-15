from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'names', 'lastname', 'phone', 'address', 'password', 'password_confirm')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Credenciales inválidas')
            if not user.is_active:
                raise serializers.ValidationError('Cuenta desactivada')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Debe incluir username y password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'names', 'lastname', 'phone', 'address', 'date', 'is_active')
        read_only_fields = ('id', 'date', 'is_active')
