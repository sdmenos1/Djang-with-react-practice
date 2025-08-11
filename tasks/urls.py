from django.urls import path,include
from rest_framework import routers
from tasks import views 
from rest_framework.documentation import include_docs_urls
router=routers.DefaultRouter()
router.register(r'tasks', views.TaskViewSet,'tasks')

urlpatterns = [
    # Define your URL patterns here
    path("api/v1/",include(router.urls)),
    path("docs/",include_docs_urls(title="Tasks API Documentation")),
]