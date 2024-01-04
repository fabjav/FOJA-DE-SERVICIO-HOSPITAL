from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Resolucion(models.Model):
    numero = models.CharField(max_length=20)
    fecha_aprobacion = models.DateField()
    descripcion = models.TextField()
    fecha_carga = models.DateField(null=True)
    hora_carga = models.TimeField(null=True)

    def __str__(self):
        return f"Resolución {self.numero} - {self.descripcion}"

class Registro(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    fecha = models.DateField()
    descripcion = models.TextField()
    resolucion = models.ForeignKey(Resolucion, on_delete=models.CASCADE)
    fecha_carga = models.DateField(null=True)
    hora_carga = models.TimeField(null=True)

    def __str__(self):
        return f"Registro {self.id}"

class Cambio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cambiar_contraseña = models.BooleanField(default=False)

    def __str__(self):
        return f"Cambio de contraseña para {self.user.username}"

