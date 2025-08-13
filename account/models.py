from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El correo electronico es obligatorio')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)
class User(AbstractBaseUser):
    username = models.CharField('Nombre de usuario', max_length=150, unique=True)
    names = models.CharField('Nombres',max_length=150 , blank=True, null=True)
    lastname = models.CharField('Apellidos',max_length=150, blank=True, null=True)
    email = models.EmailField('Correo electronico',unique=True)
    phone = models.CharField('Numero telefonico',max_length=15, blank=True, null=True)
    address = models.CharField('Direccion',max_length=255, blank=True, null=True)
    date = models.DateField('Fecha de nacimiento',auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','names','lastname']

    objects = UserManager()

    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'