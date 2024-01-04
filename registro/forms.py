from django import forms

class RegistroForm(forms.Form):
    usuario = forms.CharField(label='DNI', max_length=10)
    nombre = forms.CharField(label='Nombre', max_length=50)
    apellido = forms.CharField(label='Apellido', max_length=50)
    contraseña = forms.CharField(label='Contraseña', required=False)
