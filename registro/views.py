from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.shortcuts import render, HttpResponseRedirect
from .forms import RegistroForm
from .models import Cambio

def registro(request):
    
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            # Crear un nuevo usuario con los datos del formulario
            username = form.cleaned_data['usuario']
            password = form.cleaned_data['contraseña']
            last_name = form.cleaned_data['apellido']
            first_name = form.cleaned_data['nombre']

            # Crear el usuario
            nuevo_usuario = User.objects.create_user(username=username, password=password, first_name=first_name, last_name=last_name )
            busqueda = User.objects.filter(username=nuevo_usuario).first()
            if busqueda:
                Cambio.objects.create(user=busqueda, cambiar_contraseña=True)
            
       
            

    else:
        form = RegistroForm()

    return render(request, 'registro/registro.html', {'form': form})
