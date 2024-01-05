from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.shortcuts import render, HttpResponseRedirect, redirect
from .forms import RegistroForm, crearResolucion
from .models import Cambio, Resolucion
from datetime import datetime
from django.http import JsonResponse
def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            #crear usuario
            username = form.cleaned_data['usuario']
            password = form.cleaned_data['contraseña']
            apellido = form.cleaned_data['apellido']
            nombre = form.cleaned_data['nombre']

            nuevo_usuario = User.objects.create_user(
                username=username, password=password, first_name= nombre, last_name=apellido
                ) 
            #crear cambio
            crear_cambio = Cambio.objects.create(
                user=nuevo_usuario, cambiar_contraseña=True
                )
    else:
        form = RegistroForm()
    return render (request, 'registro/registro.html', {'form': form})

def crear_resolucion(request):
    if request.method == 'POST':
        form = crearResolucion(request.POST)
        if form.is_valid():
            #crear resolución
            num = form.cleaned_data['numero']
            desc = form.cleaned_data['descripcion']
            fecha_aprobacion = form.cleaned_data['fecha_aprobacion']
            
            #fecha y ahora actuales
            fecha_actual = datetime.now().date()
            hora_actual = datetime.now().time()

            nueva_resolucion = Resolucion.objects.create(
                numero = num,
                descripcion = desc,
                fecha_aprobacion = fecha_aprobacion,
                fecha_carga = fecha_actual,
                hora_carga = hora_actual

            )
            #redirección

    else:
        form = crearResolucion()
    return render(request, 'registro/crear_resolucion.html', {'form': form})


def get_usuarios(request):
    usuarios = list(User.objects.values())
    if (len(usuarios) > 0):
        data = {'message': 'Succes','usuarios': usuarios}
    else:
        data = {'message': 'not found'}
    return JsonResponse(data)

def index(request):
    return render(request, 'registro/usuarios.html')