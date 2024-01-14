from django.urls import path
from . import views

urlpatterns = [
    path('registro/', views.registro, name='registro'), #crear usuarios desde adm
    path('crear-resolucion/', views.crear_resolucion, name='crearResolucion'),
    path('usuarios/', views.get_usuarios, name='get_usuarios'), 
    path('', views.index, name='index'),
    path('busqueda/', views.busquedaUsuarios, name='busqueda'), #test
    path('index2', views.index2, name='index2'), #crear registros desde adm
    path('crear-registro/', views.crearRegistro, name="crear_registro"), #obtener datos
    path('resoluciones/', views.getResoluciones, name="resoluciones"), #obtener resoluciones
    path('ver-registro/', views.verRegistros, name="ver_registros"),
    path('registros/<str:username>/', views.getRegistros, name="ver_registros"),
    path('eliminar-usuario/', views.eliminarUsuario, name='eliminar_usuario')
    
]