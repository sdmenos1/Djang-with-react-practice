from django.urls import path, include
from rest_framework import routers
from account import views
from rest_framework.documentation import include_docs_urls
router = routers.DefaultRouter()
router.register(r'account', views.UserViewSet, 'account')
urlpatterns = [
    path('api/register/',include(router.urls)),
    path('docs/register/', include_docs_urls(title='Account API Documentation'), name= "account_docs"),
]