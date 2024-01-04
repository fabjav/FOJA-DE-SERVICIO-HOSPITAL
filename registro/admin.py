from django.contrib import admin
from .models import Cambio
# Register your models here.

@admin.register(Cambio)
class CambioAdmin(admin.ModelAdmin):
    list_display = ('user','cambiar_contraseña')