from django.contrib import admin
from .models import Cambio, Resolucion
# Register your models here.

@admin.register(Cambio)
class CambioAdmin(admin.ModelAdmin):
    list_display = ('user','cambiar_contraseña')

@admin.register(Resolucion)
class ResolucionAdmin(admin.ModelAdmin):
    list_display = ('numero', 'descripcion')