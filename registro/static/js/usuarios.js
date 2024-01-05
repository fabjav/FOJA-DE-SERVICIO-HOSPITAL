const listarUsuarios = async () => {
    try {
        console.log('si listar')
        const response = await fetch("./usuarios");
        const data = await response.json();

        if (data.message === 'Succes') {
            let contenido = ``;
            let par = 1;
            let clase = ``;
            data.usuarios.forEach((usuario) => {
                if (usuario.username !== 'admin') {
                    if (par % 2 === 0) {
                        clase = 'con1'
                    }
                    else {
                        clase = 'con2'
                    }
                    contenido += `<tr>`;
                    contenido += `<td class="${clase}">${usuario.username}</td>`;
                    contenido += `<td class="${clase}">${usuario.first_name}</td>`;
                    contenido += `<td class="${clase}">${usuario.last_name}</td>`;
                    contenido += `<td ><button id="id_btn" class="btnRegistro"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                    viewBox="0 0 51 55"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                     <defs>
                      <style type="text/css">
                       <![CDATA[
                        .fil1 {fill:#2F63AD}
                        .fil0 {fill:white}
                       ]]>
                      </style>
                     </defs>
                     <g id="Capa_x0020_1">
                      <metadata id="CorelCorpID_0Corel-Layer"/>
                      <path class="fil0" d="M2 0l36 0c1,0 1,1 1,2l0 9c0,0 0,1 0,1l-18 18c-1,0 -1,1 -1,1l-2 8c0,1 0,2 1,3 1,0 1,1 2,0l9 -2c0,0 0,0 1,0l8 -9c0,0 0,0 0,0 0,0 0,1 0,1l0 21c0,1 0,2 -1,2l-36 0c-1,0 -2,-1 -2,-2l0 -51c0,-1 1,-2 2,-2z"/>
                      <path class="fil1" d="M22 31l7 8 -8 1c0,1 -1,0 -1,0 0,0 0,0 0,-1l2 -8zm17 -16l7 7 -15 15 -8 -7 16 -15zm7 -5l5 5c0,0 0,1 0,2l-4 4 -7 -7 3 -4c1,-1 2,-1 3,0z"/>
                     </g>
                    </svg>
                    </button></td>`; // Añadido botón
                    contenido += `</tr>`;


                    par += 1
                };


            });
            ttbody.innerHTML = contenido;

        };
    }
    catch (error) {
        console.log(error);
    }

};



const cargaInicial = async () => {
    await listarUsuarios();
    console.log('si')
    // Obtén la referencia al botón
    const miBoton = document.getElementById('id_btn');

    // Añade el EventListener al botón
    miBoton.addEventListener('click', function () {
        console.log('¡Hiciste clic en el botón!');
    });

};

window.addEventListener("load", async () => {
    await cargaInicial();
});

