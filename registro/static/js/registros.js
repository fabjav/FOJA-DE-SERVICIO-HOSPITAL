let not_found;
let datos_tabla;
const obtenerRegistros = async () => {
    try {
        // Obtiene el valor de username de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');

        // Verifica si se ha proporcionado un valor de username
        if (username) {
            // enviar y recibir datos
            const response = await fetch(`/registros/${username}`);
            const data = await response.json();


            if (data.message === 'Success') {
                console.log('datos encontrados:', data.datos_tabla);
                datos_tabla = data.datos_tabla;
                not_found = false;
            } else {
                console.log('not found');
                datos_tabla = data.datos_tabla;
                
                not_found = true;
                
            }
            llenarTabla(datos_tabla, not_found)
        } else {
            console.log('No se proporcionó un valor de username en la URL.');
        }
    } catch (error) {
        console.log(error);
    }
};

const llenarTabla = async (datos_tabla, not_found) => {
    let nombre = ``;
    nombre += `Registros de ${datos_tabla.nombre_apellido.nombre} ${datos_tabla.nombre_apellido.apellido}`
    titulo_registro_nombre.innerHTML = nombre;
    
    if (not_found) {
        not__found.innerHTML = 'Sin registros';
        tabla_registros.innerHTML = ``;
    } else {
        
        let contenido = ``;
       
        for (let i = 0; i < datos_tabla.size; i++) {

            contenido += `<tr>`;
            contenido += `<td>${datos_tabla.registros[i].fecha}</td>`
            contenido += `<td>${datos_tabla.registros[i].descripcion}</td>`
            contenido += `<td>${datos_tabla.resoluciones[i].numero}</td>`
            // botón ver eliminar
            contenido += `<td class=""><button onclick="confirmacionEliminacion()" class="btnRegistro">
            <svg width="20px" height="20px" viewBox="0 0 15 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#DE2525" d="M0 5l15 0 0 -2c0,0 0,-1 -1,-1l-3 0 0 -2 -6 0 0 2 -4 0c0,0 -1,1 -1,1l0 2zm1 1l14 0 -2 17c0,0 -1,1 -1,1l-9 0c0,0 -1,-1 -1,-1l-1 -17zm9 15l0 0c0,0 0,0 0,-1l1 -10c0,0 0,0 0,0l0 0c-1,0 -1,0 -1,0l-1 10c0,1 0,1 1,1zm-5 -11l0 0c0,0 1,0 1,0l0 10c1,1 0,1 0,1l0 0c-1,0 -1,0 -1,-1l-1 -10c0,0 0,0 1,0zm5 -8l-4 0 0 -1 4 0 0 1z"/>
            </svg></button></td>`
            contenido += `</tr>`;

            console.log(datos_tabla.registros[i].fecha)
        }



        tabla_registros_tbody.innerHTML = contenido;

    }

   
    

}

const cargaInicial = async () => {
    await obtenerRegistros();
};

window.addEventListener("load", async () => {
    console.log('si');
    await cargaInicial();
});
