from django.urls import path
from . import views

urlpatterns = [
    path('registro/', views.registro, name='registro'),
    path('crear-resolucion/', views.crear_resolucion, name='crearResolucion'),
    path('usuarios/', views.get_usuarios, name='get_usuarios'),
    path('', views.index, name='index'),
]