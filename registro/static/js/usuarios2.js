let opciones = ``
let dataTable;
const obtenerDatos = async () => {
    try {
        console.log('listando usuarios en tabla')
        const searchInput = document.getElementById('searchInput');
        const search_term = searchInput.value.trim();
        const response = await fetch(`./busqueda/?search_term=${search_term}`);
        const data = await response.json();
        if (data.message === 'Succes') {
            const tablaSize = data.usuarios.length;
            dataTable = data.usuarios;
            mostrarTabla(dataTable);
            crearPaginacion(tablaSize);
            //const jsonporcion = data.usuarios; //una variable con el elemento 'usuarios' dentro del json
            //const mostrar = jsonporcion //.slice(1,5) //hace una particion 
        }

    }
    catch (error) {
        console.log(error)
    }
}
const listarUsuarios = async (dataTableM) => {
    try {
        console.log('datatable desde listar', dataTableM);
        let contenido = ``;
        let par = 1;
        let clase = ``;

        dataTableM.forEach((usuario) => {
            if (usuario.username !== 'admin') {
                if (par % 2 === 0) {
                    clase = 'con1'
                }
                else {
                    clase = 'con2'
                }
                contenido += `<tr class="contenido-tabla">`;
                contenido += `<td class="${clase}">${usuario.username}</td>`;
                contenido += `<td class="${clase}">${usuario.first_name}</td>`;
                contenido += `<td class="${clase}">${usuario.last_name}</td>`;
                //botón crear registro
                contenido += `<td class="${clase}"><button onclick="onClickButton('${usuario.first_name}','${usuario.last_name}','${usuario.username}')" class="btnRegistro">
                <svg width="20px" height="20px" viewBox="0 0 51 55" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#2F63AD" d="M2 0l36 0c1,0 1,1 1,2l0 9c0,0 0,1 0,1l-18 18c-1,0 -1,1 -1,1l-2 8c0,1 0,2 1,3 1,0 1,1 2,0l9 -2c0,0 0,0 1,0l8 -9c0,0 0,0 0,0 0,0 0,1 0,1l0 21c0,1 0,2 -1,2l-36 0c-1,0 -2,-1 -2,-2l0 -51c0,-1 1,-2 2,-2z"/>
                    <path fill="#2F63AD" d="M22 31l7 8 -8 1c0,1 -1,0 -1,0 0,0 0,0 0,-1l2 -8zm17 -16l7 7 -15 15 -8 -7 16 -15zm7 -5l5 5c0,0 0,1 0,2l-4 4 -7 -7 3 -4c1,-1 2,-1 3,0z"/>
                </svg></button></td>`
                // botón ver eliminar
                contenido += `<td class="${clase}"><button onclick="confirmacionEliminacion('${usuario.username}', '${usuario.first_name}', '${usuario.last_name}')" class="btnRegistro">
                <svg width="20px" height="20px" viewBox="0 0 15 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#DE2525" d="M0 5l15 0 0 -2c0,0 0,-1 -1,-1l-3 0 0 -2 -6 0 0 2 -4 0c0,0 -1,1 -1,1l0 2zm1 1l14 0 -2 17c0,0 -1,1 -1,1l-9 0c0,0 -1,-1 -1,-1l-1 -17zm9 15l0 0c0,0 0,0 0,-1l1 -10c0,0 0,0 0,0l0 0c-1,0 -1,0 -1,0l-1 10c0,1 0,1 1,1zm-5 -11l0 0c0,0 1,0 1,0l0 10c1,1 0,1 0,1l0 0c-1,0 -1,0 -1,-1l-1 -10c0,0 0,0 1,0zm5 -8l-4 0 0 -1 4 0 0 1z"/>
                </svg></button></td>`
                //botón ver registros
                contenido += `<td class="${clase}"><button onclick="verPerfil('${usuario.username}')" class="btnRegistro">
                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 532 531">
                    <style>
                        .fil1 {fill:#3847CF}
                        .fil0 {fill:white}
                    </style>
                    <g id="configuración">
                        <path class="fil0" d="M49 516l293 0c-8,-7 -12,-16 -12,-26 0,-10 5,-20 13,-26 46,-36 94,-48 141,-34 -7,-60 -59,-107 -121,-107l-240 0c-68,0 -123,55 -123,123l0 21c0,27 22,49 49,49z"/>
                        <path class="fil0" d="M228 0l30 0c38,0 69,31 69,69l0 101c0,46 -38,84 -84,84l0 0c-47,0 -84,-38 -84,-84l0 -101c0,-38 31,-69 69,-69z"/>
                        <path class="fil1" d="M529 484c-55,-46 -112,-46 -171,-1 -2,2 -3,4 -3,7 0,3 1,5 3,7 59,45 116,45 171,-1 2,-1 3,-3 3,-6 0,-3 -1,-5 -3,-6zm-82 -21c15,0 27,12 27,27 0,15 -12,27 -27,27 -16,0 -28,-12 -28,-27 0,-15 12,-27 28,-27z"/>
                        <circle class="fil1" cx="457" cy="487" r="13"/>
                    </g>
                    </svg>
                    </button></td>`
                contenido += `</tr>`;

                par += 1
            };



        });
        ttbody.innerHTML = contenido;



    }
    catch (error) {
        console.log(error);
    }


};

const confirmacionEliminacion = async (usuario, firstName, lastName) =>{
    mensaje_confirmacion = document.getElementById('mensaje_en_pantalla');
    let contenido = ``
    contenido += `<h3>¿Desea eliminar este usuario?</h3>`;
    contenido += `<p>${usuario}, ${firstName} ${lastName}</p>`;
    contenido += `<button onclick="eliminarUsuario('${usuario}')"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512" fill="#109010"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>`;
    contenido += `<button  onclick="desaparecer_btn()"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512" fill="#d7231a"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button>`;
    mensaje_confirmacion.innerHTML = contenido;
    mensaje_confirmacion.style.display = 'block';

}
const desaparecer_btn = async () =>{
    mensaje_confirmacion = document.getElementById('mensaje_en_pantalla');
    mensaje_confirmacion.style.display = 'none';
}
const eliminarUsuario = async (usuario) => {
    
    try {
        console.log('enviando datos', usuario)
        
        const formData = new FormData();
        formData.append('usuario', usuario)
        
        const csrftoken = getCookie('csrftoken');

        const response = await fetch('/eliminar-usuario/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrftoken,
            },
        });

        const data = await response.json();
        
        
        mensaje_confirmacion.style.display = 'none';
        // Tu lógica para manejar los datos
        await obtenerDatos(); // Espera a que la petición fetch y la obtención de datos se completen antes de continuar
    } catch (error) {
        console.log(error);
    }
    mensaje = `
        <h3 style="color:green; background-color: lightgreen" class="mensajeEstadoRegistro">Usuario ${usuario} eliminado.</h3>
        `
        
        mensajeFlotante.innerHTML = mensaje;
        setTimeout(function () {
        mensajeFlotante.style.display = 'block';
        }, 500);
        setTimeout(function () {
        mensajeFlotante.style.display = 'none';
        }, 3000);
}


// Función para obtener el valor del cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const verPerfil = (username) => {
    // Redirige a la ruta /registros con el parámetro username
    window.location.href = `/ver-registro?username=${username}`;
};

//seleccionar opciones

const seleccionOpciones = async (element) => {
    var opc = element.textContent;
    var opc_dividida = opc.split(' - ');
    var opc_elegida = opc_dividida[0];
    console.log(opc_elegida)
    var selectForm1 = document.getElementById('selectForm');

    selectForm1.value = opc_elegida;
    console.log('eleccion:', selectForm1.value)
    enc_resolucion.innerHTML = opc_elegida;

}

//mostrar opciones

enc_resolucion.addEventListener('click', function () {

    event.stopPropagation(); // Evita que el evento de clic se propague al documento
    console.log('fabito');
    var displayValue = window.getComputedStyle(opc_resolucion).getPropertyValue('display');
    if (displayValue === 'none') {
        opc_resolucion.style.display = 'block';

    } else if (displayValue === 'block') {
        opc_resolucion.style.display = 'none';

    }
});

document.addEventListener('click', function () {
    console.log('click en cualquier lugar del documento');
    opc_resolucion.style.display = 'none';
});

const listarResoluciones = async () => {
    try {
        const response = await fetch("./resoluciones");
        const data = await response.json();
        console.log('datos aquí', data);
        let opciones2 = ``
        if (data.message == "Succes") {

            data.resoluciones.forEach((resolucion) => {
                opciones += `<option class="opc" value='${resolucion.numero}'>${resolucion.numero} - ${resolucion.descripcion}</option>`;
                opciones2 += ` <div class="opc-resolucion-valor" onclick="seleccionOpciones(this)">${resolucion.numero} - ${resolucion.descripcion}</div>`

            });
            //selectForm.innerHTML = opciones;
            opc_resolucion.innerHTML = opciones2;

        } else {
            console.log('nada nadita')
        }

    } catch (error) {
        console.log(error);
    }

}

function onClickButton(firstName, lastName, username) {
    console.log(`Botón clickeado para el usuario: ${username}`);
    
    const search_term = username;
    formulario = document.getElementById('div-form-crear-registro');
    formCont1 = `        <h3 class="tituloFormRegistro">Crear registro para ${firstName} ${lastName}</h3>

                            <input class="txtCamp" name="txtDNI" type="text" value=${username}></input>
                            <input class="txtCamp" name="txtDesc" type="text" placeholder="descripcion"></input>
                            
                           
        
                    `
    formCont2 = `
        <input class="txtCamp" name="Fecha" type="date"></input>
                           
        <button class="btnRegistro1" type="submit"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="7.3657mm" height="6.1039mm" version="1.1"
        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 27 22" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <style type="text/css">
            <![CDATA[
            .fil0 {
              fill: #6CBA3F;
              fill-rule: nonzero
            }
            ]]>
          </style>
        </defs>
        <g id="vista_x0020_2">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <path class="fil0"
            d="M7 22l11 -8c0,0 1,0 1,1l2 1c0,1 0,1 1,1 0,0 1,-1 1,-1l4 -14c0,-1 0,-1 0,-2 0,0 -1,0 -1,0l-15 0c-1,0 -1,0 -1,1 0,0 0,1 0,1l1 2c1,0 0,1 0,1l-11 8c0,1 0,1 0,2l6 7c0,1 1,1 1,0z" />
        </g>
      </svg></button>
        `
    divp1.innerHTML = formCont1;
    divp2.innerHTML = formCont2;
    //window.location.href = `./crear-registro/?usuario=${search_term}`;

}

document.getElementById('form-crear-registro').addEventListener('submit', function (event) {
    // Evitar la acción por defecto del formulario (recargar la página)
    event.preventDefault();
    
    // Obtener los datos del formulario
    const formData = new FormData(this);

    // Enviar los datos al servidor mediante AJAX
    fetch('/crear-registro/', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json()) //el mensaje
        .then(data => {

            mensaje = ``;
            if (data.estado === 'Exito') {
                
                mensaje += `
                            <h3 style="color:green; background-color: lightgreen" class="mensajeEstadoRegistro">Registro creado con exito.</h3>
                `
            } else if (data.estado === 'Usuario Inexistente') {
                mensaje += `
                            <h3 style="color:red; background-color: pink" class="mensajeEstadoRegistro">Error. Usuario no encontrado.</h3>
                `

            } else if (data.estado === 'Existente') {
                mensaje += `
                            <h3 style="color:green; background-color: lightgreen" class="mensajeEstadoRegistro">Ya existe un registro identico.</h3>
                `
            }
            mensajeFlotante.innerHTML = mensaje;
            setTimeout(function () {
                mensajeFlotante.style.display = 'block';
            }, 500);
            setTimeout(function () {
                mensajeFlotante.style.display = 'none';
            }, 3000);

            // Procesar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
        })

        .catch(error => {
            console.error('Error al enviar el formulario:', error);
        });

});
const mostrarTabla = async (dataTable, filasPorPagina, pagina) => {
    console.log('mostrar tabla', dataTable);
    console.log('filas por pagina', filasPorPagina);
    const indiceInicial = (pagina - 1) * filasPorPagina
    const indiceFinal = indiceInicial + filasPorPagina
    console.log('indice inicial', indiceFinal);
    const dataTableM = dataTable.slice(indiceInicial, indiceFinal);
    listarUsuarios(dataTableM);


}

const crearPaginacion = async (tablaSize) => {
    //console.log('table size:', tablaSize)
    const filasPorPagina = 8;
    const totalPaginas = Math.ceil(tablaSize / filasPorPagina);
    console.log('cantidad de paginas', totalPaginas);
    console.log('hasta aquí todo ok')
    const select = document.getElementById('select-paginacion');
    let option = ``;
    for (let i = 0; i < totalPaginas; i++) {
        option += `<option value="${i + 1}" >${i + 1}</option>`
    }
    select.innerHTML = option;

    select.addEventListener('change', (event) => {
        let pagina = event.target.value;
        console.log(pagina)
        mostrarTabla(dataTable, filasPorPagina, pagina)
    })
    mostrarTabla(dataTable, filasPorPagina, 1);



}

const cargaInicial = async () => {

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("input", async () => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 
        }
        await obtenerDatos();


    });

    await obtenerDatos();
    await listarResoluciones();


};

window.addEventListener("load", async () => {
    await cargaInicial();

});

