from django import forms

class RegistroForm(forms.Form):
    usuario = forms.CharField(
        label='', 
        max_length=10, 
        widget=forms.TextInput(attrs={'placeholder': 'DNI','class': 'campo_form'})
        )
    nombre = forms.CharField(
        label='',
        max_length=50,
        widget=forms.TextInput(attrs={'placeholder': 'NOMBRE', 'class': 'campo_form'})
        )
    apellido = forms.CharField(
        label='', 
        max_length=50,
        widget=forms.TextInput(attrs={'placeholder': 'APELLIDO', 'class': 'campo_form'})
        )
    contraseña = forms.CharField(
        
        label='',
        required=False,  # Puedes omitir esto si deseas que la contraseña sea requerida
        widget=forms.TextInput(attrs={'placeholder': 'CONTRASEÑA', 'class': 'campo_form'})
    )

class crearResolucion(forms.Form):
    numero = forms.IntegerField()
    descripcion = forms.CharField(
        label='',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder':'DESCRIPCIÓN', 'class': 'campo_form'})
    )
    
    fecha_aprobacion = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'})
    )
class crearRegistro(forms.Form):
    nombre 