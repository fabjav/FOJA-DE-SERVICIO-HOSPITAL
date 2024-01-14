from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.shortcuts import render, HttpResponseRedirect, redirect
from .forms import RegistroForm, crearResolucion, crearRegistroADM
from .models import Cambio, Resolucion, Registro
from datetime import datetime
from django.http import JsonResponse
from django.db.models import Q
from django.http import HttpResponseNotFound
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required



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

def busquedaUsuarios(request):
    #search_term = '333'
    search_term = request.GET.get('search_term','')
    if search_term:
        usuarios = list(User.objects.filter(
            Q(username__icontains=search_term) |
            Q(first_name__icontains=search_term) |
            Q(last_name__icontains=search_term)
        ).values())
    else:
        usuarios = list(User.objects.values())
    if len(usuarios) > 0:
        data = {'message': 'Succes','usuarios': usuarios}
    else:
        data = {'message': 'not found'}
    return JsonResponse(data)

def index2(request):
    return render(request, 'registro/busqueda.html')



def crearRegistro(request):
    if request.method == 'POST':
        DNI = request.POST['txtDNI']
        desc = request.POST['txtDesc']
        fecha = request.POST['Fecha']
        resol = request.POST['Resol']
        
         #fecha y ahora actuales
        fecha_actual = datetime.now().date()
        hora_actual = datetime.now().time()
        usuario = User.objects.filter(username=DNI).first()
        # el problema es que está buscando una cadena. necesito que busque el numero
        resolucionv = Resolucion.objects.filter(numero=resol).first()
        print(resolucionv)
        
        if usuario:
            if not Registro.objects.filter(descripcion=desc, fecha=fecha, resolucion = resolucionv).exists():

                nuevo_registro = Registro.objects.create(
                    user = usuario,
                    fecha = fecha,
                    resolucion = resolucionv,
                    descripcion = desc,
                    fecha_carga = fecha_actual,
                    hora_carga = hora_actual)
            
                estado = 'Exito'
            else:
                estado = 'Existente'
                
        else:
            estado = 'Usuario Inexistente'    
        mensaje = {'estado': estado} 
        print(mensaje)   
        return JsonResponse(mensaje)
    

def getResoluciones (request):
    resoluciones = list(Resolucion.objects.values())
    if (len(resoluciones) > 0):
        data = {'message': "Succes",'resoluciones': resoluciones}
    else:
        data = {'message': 'not found'}
    return JsonResponse(data)

'''
1. obtener el usuario para obtener su id
2. buscar user_id coincidente


def getRegistros (request):
    registros = list(Registro.objects.values())
    if (len(registros) > 0):
        data = {'message': "Succes",'registros': registros}
    else:
        data = {'message': 'not found'}
    return JsonResponse(data)

def verRegistros (request):
    return render(request, 'registro/registrosUsuarios/registrosUsuarios.html')

'''

def getRegistros(request, username):
    #usuario = list(User.objects.filter(username=username).values())
    usuario1 = get_object_or_404(User, username=username)
    #print('usuario: ',usuario1.first_name)
    nombre_apellido = {'nombre': usuario1.first_name, 'apellido': usuario1.last_name}
    usuario_id = usuario1.id
    registros = list(Registro.objects.filter(user_id=usuario_id).values())
    resoluciones = []
    for registro in registros:
        resolucion_id = registro['resolucion_id']
        resoluciones.append(resolucion_id)
        
    resoluciones_registros = []
    for r in resoluciones:
        if Resolucion.objects.filter(id=r).exists():

             resoluciones_registros.append (Resolucion.objects.filter(id=r).values('numero')[0])
    print('resoluciones',resoluciones_registros)
    registros_tamaño = len(registros)
    if (len(registros) > 0):
        data = {
            'message': "Success", 
            'datos_tabla': {
                'registros': registros, 
                'nombre_apellido': nombre_apellido,
                'resoluciones': resoluciones_registros,
                'size': registros_tamaño,
                }, 
           
            }
    else:
        data = {'message': "Not Found",
                'datos_tabla': {
                    'nombre_apellido': nombre_apellido,
                }}

    return JsonResponse(data)

def verRegistros(request):
    return render(request, 'registro/registrosUsuarios/registrosUsuarios.html')
    

#falta estilizar el verRegistros

'''
eliminar usuario.

obtener username
eliminar

'''
@login_required
def eliminarUsuario (request):
    if request.method == 'POST':
        
        usuario = request.POST['usuario'] 
        usuario1 = get_object_or_404(User, username=usuario)
        nombre_eliminado = usuario1.first_name
        apellido_aliminado = usuario1.last_name
        User.objects.filter(username=usuario).delete()
        mensaje = f' desde python, usuario recibido: {usuario}' 
        print(mensaje)   
        mensaje_js = {'mensaje': mensaje} 

        #crear registros en auditoria

        usuario_autenticado = request.user
        nombre_usuario = usuario_autenticado.first_name
        apellido_usuario = usuario_autenticado.last_name
        movimiento = ' ELIMINACIÓN DE USUARIO '
        
        print('usuario: ',usuario1.first_name)
        print(f'{usuario_autenticado}, {nombre_usuario} {apellido_usuario} => {movimiento} => {usuario1}, {nombre_eliminado} {apellido_aliminado}')

        return JsonResponse(mensaje_js)
    
 