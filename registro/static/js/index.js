document.addEventListener('DOMContentLoaded', function() {
    const usuarioInput = document.querySelector('#id_usuario');
    const nombreInput = document.querySelector('#id_nombre');
    const apellidoInput = document.querySelector('#id_apellido');
    const contraseñaInput = document.querySelector('#id_contraseña');

    // Autocompletar dinámicamente la contraseña basada en el usuario
    usuarioInput.addEventListener('input', function() {
      contraseñaInput.value = usuarioInput.value;
    });

    // Agregar dinámicamente la primera letra de nombre y apellido a la contraseña
    nombreInput.addEventListener('input', actualizarContraseña);
    apellidoInput.addEventListener('input', actualizarContraseña);

    function actualizarContraseña() {
      const primeraLetraNombre = nombreInput.value.charAt(0);
      const primeraLetraApellido = apellidoInput.value.charAt(0);
      contraseñaInput.value = usuarioInput.value;
    }

    // Deshabilitar la edición del campo de contraseña
    contraseñaInput.addEventListener('focus', function() {
      contraseñaInput.blur(); // Desenfocar el campo para evitar la edición directa
    });
    const exito = "{{ exito }}";
    console.log(exito);
  });

