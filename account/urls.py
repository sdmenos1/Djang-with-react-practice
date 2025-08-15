from django.urls import path, include
from rest_framework import routers
from account import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, 'users')

urlpatterns = [
    # Auth endpoints
    path('api/register/', views.register_view, name='register'),
    path('api/login/', views.login_view, name='login'),
    path('api/logout/', views.logout_view, name='logout'),
    path('api/profile/', views.profile_view, name='profile'),
    
    # CRUD endpoints
    path('api/', include(router.urls)),
    
    # Documentation
    path('docs/', include_docs_urls(title='Account API Documentation'), name='account_docs'),
]
