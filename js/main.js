/* Proyecto final JavaScript
   Buscador de ALquileres "El Hornerito" */

// JQUERY
//Mientras se carga muestro una imagen
$(window).on("load", function () {
    $(".carga").fadeOut(6000);
});

//------------cargo usuarios desde Json------------//
//Declaro la url que uso para levantar los deptos



//Creo las clases USUARIO e INMUEBLE
class Usuario {
    constructor(idUsuario, nombreUsuario, apellidoUsuario, localidadUsuario, emailUsuario, telefonoUsuario, tipoUsuario, publicacionesUsuario) {
        this.id = idUsuario;
        this.nombre = nombreUsuario;
        this.apellido = apellidoUsuario;
        this.localidad = localidadUsuario;
        this.email = emailUsuario;
        this.telefono = telefonoUsuario;
        this.tipo = tipoUsuario;
        this.publicaciones = publicacionesUsuario;
    }
}

class Inmueble {
    constructor(idInmueble, tipoInmueble, localidadInmueble, tipoUso, cantHab, cantBanio, cochera, montoAlq, montoExp, img1) {
        this.id = idInmueble;
        this.tipo = tipoInmueble;
        this.localidad = localidadInmueble;
        this.uso = tipoUso;
        this.habitaciones = cantHab;
        this.banios = cantBanio;
        this.cochera = cochera;
        this.monto = formato.format(montoAlq);
        this.expensas = formato.format(montoExp);
        this.img1 = img1;
    }
};
//le doy formato a los numeros que representan dinero
const formato = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARG',
    minimumFractionDigits: 0,
});



//instacio algunos objetos Usuario
let Publicador1 = new Usuario(1, 'Lorenzon', 'Inmobiliaria', 'Parana', 'email@email.com', '123456', 'Publicador', []);
let Publicador2 = new Usuario(2, 'Jose Perez', 'Particular', 'Parana', 'email@email.com', '123456', 'Publicador', []);
let Publicador3 = new Usuario(3, 'Caramagna', 'Inmobiliaria', 'Parana', 'email@email.com', '123456', 'Publicador', []);
let Publicador4 = new Usuario(4, 'Alicia Reyes', 'Particular', 'Parana', 'email@email.com', '123456', 'Publicador', []);
//declaro la variable global usuario que va a ser a la que le asigno los datos de quien inicie sesion
let Usuario1;
let arrayUsuarios =[];
//instancio algunos objetos inmueble, luego los agrego a un array de objetos
let Departamento1 = new Inmueble(01, 'Casa', 'Parana', 'Vivienda', 2, 1, false, 22000, 4000, 'media/img/inmuebles/casa1t.jpg');
let Departamento2 = new Inmueble(02, 'Departamento', 'Rosario', 'Vivienda', 3, 1, true, 33000, 7000, 'media/img/inmuebles/depto1t.jpg');
let Departamento3 = new Inmueble(03, 'Departamento', 'Parana', 'Vivienda', 1, 1, false, 18000, 3000, 'media/img/inmuebles/depto2t.jpg');
let Departamento4 = new Inmueble(04, 'Local', 'Cerrito', 'Comercial', 2, 1, false, 12000, 0, 'media/img/inmuebles/local1t.jpg');
let Departamento5 = new Inmueble(05, 'Departamento', 'Villa Urquiza', 'Vivienda', 2, 1, false, 12000, 0, 'media/img/inmuebles/depto3t.jpg');
const arrayDeptos = [Departamento1, Departamento2, Departamento3, Departamento4, Departamento5];
let localidadesDisponibles = [];

/*cargo un json (base.json en root)con mas deptos publicados*/
function leerJSon(archivo, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", archivo, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//implemento leer json (leo lo local y lo de la API)
leerJSon("base.json", function (text) {
    var arrayDeptos2 = JSON.parse(text);

    for (let i = 0; i < arrayDeptos2.length; i++) {
        let desdeJson = new Inmueble(arrayDeptos2[i].id, arrayDeptos2[i].tipo, arrayDeptos2[i].localidad, arrayDeptos2[i].uso, arrayDeptos2[i].habitaciones, arrayDeptos2[i].banios, arrayDeptos2[i].cochera, arrayDeptos2[i].monto, arrayDeptos2[i].expensas, arrayDeptos2[i].img1);
        arrayDeptos.push(desdeJson);
    }
    //Leo el Json online de Inmuebles (API)
    const URLGET = "https://api.jsonbin.io/v3/b/61326fedc4352e1d076851c0/latest"
    let misDatos = [];
    $.get(URLGET, function (respuesta, estado) {
        if (estado === "success") {
            misDatos = respuesta.record;

        }


        for (let j = 0; j < misDatos.length; j++) {
            let nn = new Inmueble(misDatos[j].id, misDatos[j].tipo, misDatos[j].localidad, misDatos[j].uso, misDatos[j].habitaciones, misDatos[j].banios, misDatos[j].cochera, misDatos[j].monto, misDatos[j].expensas, misDatos[j].img1);
            arrayDeptos.push(nn);
            //cargo las localidades 
            localidadesDisponibles.push(nn.localidad);
        }
        //console.log(arrayDeptos);      

        //elimino localidades repetidas
        localidadesDisponibles = [...new Set(localidadesDisponibles)];
        //las cargo como opciones en menu desplegable de busqueda
        for (i = 0; i < localidadesDisponibles.length; i++) {
            $('#localidadInmueble').append(`<option value="${localidadesDisponibles[i]}">`);
        }
        cargoDeptos();
    });

});

//Leo el Json online de Usuarios (API)
function leoUsuarios() {    
    let URLGET_USERS = "https://api.jsonbin.io/b/6134015a470d3325940285b2/latest";
    let misUsuarios = [];
    $.get(URLGET_USERS, function (respuesta1, estado1) {
        if (estado1 === "success") {
            misUsuarios = respuesta1;
            console.log("misUsuarios", misUsuarios);
        }
        for (let j = 0; j < misUsuarios.length; j++) {
            let nn = new Usuario(misUsuarios[j].id, misUsuarios[j].nombre, misUsuarios[j].apellido, misUsuarios[j].localidad, misUsuarios[j].email, misUsuarios[j].telefono, misUsuarios[j].tipo, misUsuarios[j].publicaciones);
            arrayUsuarios.push(nn);                        
        }
        console.log(arrayUsuarios);
    });
};
leoUsuarios();

//Eventos en formularios(cambie algunos a JQUERY)
//const formInicio = document.getElementById("formularioInicio");
const formInicio = $('#formularioInicio');
const formPublicador = $("#formPublicar");
const formBuscador = $("#formBuscar");
//Eventos en botones para volver a form inicio
//const botonVolverDeBusqueda = document.getElementById("volver");
const botonVolverDeBusqueda = $("#volver");
const botonVolverDePublicar = $("#volver1");

formInicio.on('submit', validarForm);
formPublicador.on('submit', validarFormPubli);
formBuscador.on('submit', validarFormBusca);
botonVolverDeBusqueda.on('click', funcionVolverDeBusqueda);
botonVolverDePublicar.on('click', funcionVolverDePublicar);

//muestra el valor del change en el form buscar
$("#alqBuscar").change(function (e) {
    let valor = formato.format(e.target.value);
    $('#rangeAlq').text(`${valor}`)
});

$("#expBuscar").change(function (e) {
    let valor = formato.format(e.target.value);
    $('#rangeExp').text(`${valor}`)
});

//Jquery para el toggle del form de identificacion
$("#botonComenzar").click(() => {
    $("#colapsarFormulario").toggle("slow", "linear");
});

//vuelvo atras formulario buscar -> form identificacion
function funcionVolverDeBusqueda() {
    formBuscador.addClass("ocultar");
    formInicio.removeClass("ocultar");
    let resultBusq = document.getElementById("busqueda");
    resultBusq.innerHTML = ` `;
    var titulo = document.getElementById("tituloBusqueda");
    titulo.classList.add("ocultar");
}

function funcionVolverDePublicar() {
    formPublicador.addClass("ocultar");
    formInicio.removeClass("ocultar");
}

//valida el form de identificacion
function validarForm(e) {
    e.preventDefault();
    //tomo los datos ingresados en el formulario
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let localidad = document.getElementById("localidad").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let radioTipo = document.getElementById("publica").checked;
    let tipo = '';
    let id = 1;
    //Me fijo si es usuario publicador o buscador de inmuebles
    if (radioTipo) {
        tipo = 'Publicador';
    } else {
        tipo = 'Buscador';
    }

    if (nombre === '' || apellido === '' || localidad === '' || email === '' || telefono === '') {
        mostrarError('Todos los campos son obligatorios');
        return;
    }
    //con los datos ingresados, instancio el objeto Usuario
    let nuevoId = arrayUsuarios.length + 1;
    Usuario1 = new Usuario(nuevoId, nombre, apellido, localidad, email, telefono, tipo, []);
    //formulario correcto
    mostrarMensaje("Datos ingresados correctamente", Usuario1);

    // modifico el html con el nombre de usuario en la navbar
    let user = document.getElementById("username");
    user.textContent = nombre;

    let avatar = document.getElementById("avatar");
    avatar.src = 'media/img/carpincho.svg';
    arrayUsuarios.push(Usuario1);
    console.log("agrego usuario", arrayUsuarios);
    //-----------
    let jj = JSON.stringify(arrayUsuarios);
    $.ajax({
        url: 'https://api.jsonbin.io/b/6134015a470d3325940285b2',
        contentType: 'application/json',
        method: 'PUT',
        //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
        data: jj        
    }).done(function () {
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
    //----------

}

function mostrarError(mensaje) {
    $('#formularioInicio').append(`<p id="error" class='error'> ${mensaje} </p>`);


    //const error = document.createElement('P');
    //error.textContent = mensaje;
    //error.classList.add('error');
    //formInicio.appendChild(error);

    //mensaje dura 3 seg
    setTimeout(() => {
        //error = document.getElementById("error");
        error = $(".error");
        error.remove();
    }, 3000);
}

function mostrarErrorPubli(mensaje) {
    $('#formPublicar').append(`<p id="error" class='error'> ${mensaje} </p>`);


    //const error = document.createElement('P');
    //error.textContent = mensaje;
    //error.classList.add('error');
    //console.log(error);    
    //formPublicador.append(error);

    //mensaje dura 3 seg
    setTimeout(() => {
        error = $(".error");
        error.remove();
    }, 3000);
}

function mostrarErrorBusqueda(mensaje) {
    $('#formBuscar').append(`<p id="error" class='error'> ${mensaje} </p>`);

    //const error = document.createElement('P');
    //error.textContent = mensaje;
    //error.classList.add('error');
    //console.log(error);    
    //formBuscador.append(error);

    //mensaje dura 3 seg
    setTimeout(() => {
        error = $(".error");
        error.remove();
    }, 3000);
}

function mostrarMensaje(mensaje, usuario) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    formInicio.append(alerta);
    //mensaje dura 5 seg
    setTimeout(() => {
        alerta.remove();
        //formInicio.remove();
        formInicio.addClass("ocultar");

        if (usuario.tipo === "Publicador") {
            formPublicador.removeClass("ocultar");
        }
        if (usuario.tipo === "Buscador") {
            formBuscador.removeClass("ocultar");
        }

    }, 2000);
}
/*FORMULARIO PARA PUBLICAR*/
function validarFormPubli(e) {
    e.preventDefault();
    console.log("publicando..");
    //tomo los datos ingresados en el formulario
    let tipoInmueble = document.getElementById("tipoInmueblePublicar").value;
    let localidad = document.getElementById("localidadInmueblePublicar").value;
    let tipoUsos = document.getElementById("tipoUsosPublicar").value;
    let habs = document.getElementById("cantHabsPublicar").value;
    let banios = document.getElementById("cantBaniosPublicar").value;
    let cochera = document.getElementById("cocheraPublicar").checked;
    let alq = document.getElementById("costoAlqPublicar").value;
    let exp = document.getElementById("costoExpPublicar").value;
    if (tipoInmueble === '' || localidad === '' || tipoUsos === '' || habs === '' || banios === '' || cochera === '' || alq === '' || exp === '') {
        mostrarErrorPubli('Todos los campos son obligatorios');
        return;
    }
    let foto = document.getElementById("imagen").value;
    //cambio la ruta por una conocida sino me tira error el servidor
    foto = 'media/img/inmuebles/depto2t.jpg';
    //le asigno el id teniendo en cuenta la longitud del arreglo de inmuebles
    let id = arrayDeptos.length + 1;
    //Instancio el objeto con los datos ingresados
    let nuevoInmueble = new Inmueble(id, tipoInmueble, localidad, tipoUsos, habs, banios, cochera, alq, exp, foto);
    //lo ingreso al array de inmueble
    arrayDeptos.push(nuevoInmueble);
    mostrarMensajePubli("El inmueble se publicó correctamente", nuevoInmueble);
    //muestro el depto publicado
    mostrarPublicado(nuevoInmueble);
    //recargo las tarjetas con todos los deptos actualizados, incluso el recien ingresado
    cargoDeptos();
}

function mostrarMensajePubli(mensaje, inmueble) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    console.log(alerta);
    formPublicador.append(alerta);
    formBuscador.append(alerta);
    console.log("publicado", inmueble);
    //mensaje dura 5 seg
    setTimeout(() => {
        alerta.remove();
        formPublicador.remove();
    }, 1000);
    let tarjetaPubli = document.getElementById("inmueblePublicado");
    tarjetaPubli.classList.remove("ocultar");
    let tarjeta = document.getElementById("publicacion");
    console.log("contenido tarjeta", tarjeta);
    let publicacion = document.createElement("div");
    publicacion.classList.add('tarjetaDepto');
    publicacion.innerHTML = `<h3 class='parrafoTarj'> Tipo: ${inmueble.tipo}</h3>
                                    <p class='parrafoTarj'>  Localidad: ${inmueble.localidad}</p>
                                    <b class='parrafoTarj'> $ ${inmueble.monto}</b>`;
    tarjeta.appendChild(publicacion);
}
/*FORMULARIO PARA BUSCAR*/
function validarFormBusca(e) {
    e.preventDefault();
    console.log("buscando...");
    //tomo los datos ingresados en el formulario
    let tipoInmueble = document.getElementById("tipoInmuebleBuscar").value;
    let localidad = document.getElementById("localidadInmuebleBuscar").value;
    let tipoUsos = document.getElementById("tipoUsosBuscar").value;
    let habs = document.getElementById("cantHabsBuscar").value;
    let banios = document.getElementById("cantBaniosBuscar").value;
    let cochera = document.getElementById("cocheraBuscar").checked;
    let alq = document.getElementById("alqBuscar").value;
    let exp = document.getElementById("expBuscar").value;

    if (tipoInmueble === '' || localidad === '' || tipoUsos === '' || habs === '' || banios === '' || cochera === '' || alq === '' || exp === '') {
        mostrarErrorBusqueda('Todos los campos son obligatorios');
        return;
    }
    let id = 0;
    let img = ' ';
    let busqueda = new Inmueble(id, tipoInmueble, localidad, tipoUsos, habs, banios, cochera, alq, exp, img);
    console.log(busqueda);

    muestroDeptos(arrayDeptos, localidad, tipoInmueble);

}
/*----------------------------------Muestra los ultimo 10 deptos publicados al final del body-----------------------*/
function cargoDeptos() {
    //saco los primeros 10 deptos cargados del total de publicaciones
    let deptoMuestra = arrayDeptos.slice(0, 10);
    let muestras = document.getElementById("contenedorMuestras");
    muestras.innerHTML = ` `;
    for (const inmueble of deptoMuestra) {
        let contenedor = document.createElement("div");
        contenedor.classList.add('tarjetaDepto');
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<h3 class='parrafoTarj'> Tipo: ${inmueble.tipo}</h3>
                                    <p class='parrafoTarj'>  Localidad: ${inmueble.localidad}</p>
                                    <img src= ${inmueble.img1} class="imgTarjeta">
                                    <p><b class='parrafoTarj'> $ ${inmueble.monto}</b></p>
                                    <button id="btnVer${inmueble.id}" class="btnVer boton">Detalles</button>`;
        //meto el div creado dentro del contenedor
        muestras.appendChild(contenedor);

        //creo una variable para obtener el id de cada boton
        let identificador = "btnVer" + inmueble.id;
        //console.log(identificador);
        //obtengo el elemento(un boton) por si id
        let detalles = document.getElementById(identificador);
        //console.log("detalles", detalles);
        //lo dejo a la escucha de un click y que ejecute la funcion mostrarDetalles
        detalles.addEventListener('click', mostrarDetalles);
    }
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
/*----------------------------Resultados Busqueda------------------------------------*/
function muestroDeptos(objeto, localidad, tipoInmueble) {
    //traigo el id del titulo de la seccion y lo muestro
    var titulo = document.getElementById("tituloBusqueda");
    titulo.classList.remove("ocultar");
    //array para guardar lo filtrado
    let resultadoBusqueda = [];

    //Filtro de búsqueda (por ahora dejo solo por localidad por razones de prueba, tengo pocos inmuebles cargados)
    const filtroBusqueda = objeto.filter(busqueda => busqueda.localidad == localidad /*&& busqueda.tipo === tipoInmueble*/ );
    resultadoBusqueda = filtroBusqueda;
    //busqueda es el id de <section> dentro del cual quiero insertar las tarjetas  
    let resultBusq = document.getElementById("busqueda");
    //hago esto para resetear la seccion por si tenia busquedas anteriores

    resultBusq.innerHTML = ` `;
    for (elemento of resultadoBusqueda) {
        let ran1 = random(1, 54);
        let ran2 = random(1, 54);
        let ran3 = random(1, 54);
        let contenedor = document.createElement("div");
        contenedor.classList.add('tarjetaDeptoBusqueda');
        contenedor.innerHTML = `<div class="moduloDatosTarjeta">
                                <div>
                                <h3 class="textoResultados"> Tipo: ${elemento.tipo}</h3>
                                <p class ="textoResultados">  Localidad: ${elemento.localidad}</p>
                                <p class="textoResultados">Costo Alquiler: <b class="textoResultados"> $ ${elemento.monto}</b></p>
                                <p class="textoResultados ref">REF: ${elemento.id}</p>
                                </div>
                                <div>
                                <button id="btnResultado${elemento.id}" class="btnVer boton">Detalles</button>
                                </div>
                                </div>
                                <div>
                                <img class="imgResultados" src="${elemento.img1}" alt="inmueble${elemento.id}">
                                </div>
                                <div>
                                <img class="imgResultados" src="media/img/inmuebles/i${ran1}.jpg" alt="inmueble${elemento.id}interior1">
                                </div>
                                <div>
                                <img class="imgResultados" src="media/img/inmuebles/i${ran2}.jpg" alt="inmueble${elemento.id}interior2">
                                </div>
                                <div>
                                <img class="imgResultados" src="media/img/inmuebles/i${ran3}.jpg" alt="inmueble${elemento.id}interior3">
                                </div>`;
        resultBusq.appendChild(contenedor);
        //creo una variable para obtener el id de cada boton
        let identificador = "btnResultado" + elemento.id;
        //console.log(identificador);
        //obtengo el elemento(un boton) por si id
        let detalles = document.getElementById(identificador);
        //console.log("detalles", detalles);
        //lo dejo a la escucha de un click y que ejecute la funcion mostrarDetallesBusqueda
        detalles.addEventListener('click', mostrarDetallesBusqueda);

    }

}
//--------------modal para mostrar los detalles de la busqueda--------------------------//
function mostrarDetallesBusqueda(e) {
    //guardo el id del boton
    let id = e.target.id;
    //expresion regular
    var regex = /(\d+)/g;
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));
    //mis id de inmueble arrancan en 1, por eso el -1
    let propiedad = arrayDeptos[nro - 1];
    //paso el booleano a Si o No para mostrarlo
    let cochera = propiedad['cochera'];
    if (cochera) {
        estacionamiento = 'Si';
    } else {
        estacionamiento = 'No';
    }
    //creo el div para mostrar en la tarjeta
    let tarjetaDetalle = document.createElement("DIV");
    //tarjetaDetalle.classList.add('tarjetaDeptoBusqueda');
    tarjetaDetalle.classList.add('overlay');

    //Contenido de la tarjeta 
    tarjetaDetalle.innerHTML = `<div class="detalles"><p class="parrafoDetalle">${propiedad.localidad}</p>
        <h3>Tipo:${propiedad.tipo}</h3>  
        <p class="parrafoDetalle">Tipo de Uso: ${propiedad.uso}</p>    
        <p class="parrafoDetalle">Cantidad de habitaciones: ${propiedad.habitaciones}</p>
        <p class="parrafoDetalle">Cantidad de baños: ${propiedad.banios}</p>
        <p class="parrafoDetalle">Cochera: ${estacionamiento}</p>    
        <p class="parrafoDetalle">Alquiler Mesual: $ ${propiedad.monto}</p>
        <p class="parrafoDetalle">Expensas Aprox: $ ${propiedad.expensas}</p></div>
        <img class="imgDetalle" src=${propiedad.img1}></div>`;
    //Lo tiro al body
    const body = document.querySelector("body");
    body.appendChild(tarjetaDetalle);

    //btn para cerrar
    const cerrarTarjeta = document.createElement("P");
    cerrarTarjeta.textContent = 'X';
    cerrarTarjeta.classList.add('btnCerrar');
    tarjetaDetalle.appendChild(cerrarTarjeta);

    //para cerrar la tarjeta
    cerrarTarjeta.addEventListener('click', function () {
        tarjetaDetalle.remove();
    });

}


//--------------modal para mostrar el detalle de los deptos-----------------------------//
function mostrarDetalles(e) {
    //guardo el id del boton
    let id = e.target.id;
    //expresion regular
    var regex = /(\d+)/g;
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));
    //mis id de inmueble arrancan en 1, por eso el -1
    let propiedad = arrayDeptos[nro - 1];
    //paso el booleano a Si o No para mostrarlo
    let cochera = propiedad['cochera'];
    if (cochera) {
        estacionamiento = 'Si';
    } else {
        estacionamiento = 'No';
    }
    //creo el div para mostrar en la tarjeta
    let tarjetaDetalle = document.createElement("DIV");
    //tarjetaDetalle.classList.add('tarjetaDeptoBusqueda');
    tarjetaDetalle.classList.add('overlay');

    //Contenido de la tarjeta 
    tarjetaDetalle.innerHTML = `<div class="detalles"><p class="parrafoDetalle">${propiedad.localidad}</p>
    <h3>Tipo:${propiedad.tipo}</h3>  
    <p class="parrafoDetalle">Tipo de Uso: ${propiedad.uso}</p>    
    <p class="parrafoDetalle">Cantidad de habitaciones: ${propiedad.habitaciones}</p>
    <p class="parrafoDetalle">Cantidad de baños: ${propiedad.banios}</p>
    <p class="parrafoDetalle">Cochera: ${estacionamiento}</p>    
    <p class="parrafoDetalle">Alquiler Mesual: $ ${propiedad.monto}</p>
    <p class="parrafoDetalle">Expensas Aprox: $ ${propiedad.expensas}</p></div>
    <img class="imgDetalle" src=${propiedad.img1}></div>`;
    //Lo tiro al body
    const body = document.querySelector("body");
    body.appendChild(tarjetaDetalle);

    //btn para cerrar
    const cerrarTarjeta = document.createElement("P");
    cerrarTarjeta.textContent = 'X';
    cerrarTarjeta.classList.add('btnCerrar');
    tarjetaDetalle.appendChild(cerrarTarjeta);

    //para cerrar la tarjeta
    cerrarTarjeta.addEventListener('click', function () {
        tarjetaDetalle.remove();
    });

}
//-----------------modal que muestra el depto recien publicado---------------//
function mostrarPublicado(inmueble) {

    let cochera = inmueble['cochera'];
    if (cochera) {
        estacionamiento = 'Si';
    } else {
        estacionamiento = 'No';
    }
    //creo el div para mostrar en la tarjeta
    let tarjetaDetalle = document.createElement("DIV");
    //tarjetaDetalle.classList.add('tarjetaDeptoBusqueda');
    tarjetaDetalle.classList.add('overlay');

    //Contenido de la tarjeta 
    tarjetaDetalle.innerHTML = `<div><p class="parrafoDetalle">${inmueble.localidad}</p>
    <h3>Tipo:${inmueble.tipo}</h3>  
    <p class="parrafoDetalle">Tipo de Uso: ${inmueble.uso}</p>    
    <p class="parrafoDetalle">Cantidad de habitaciones: ${inmueble.habitaciones}</p>
    <p class="parrafoDetalle">Cantidad de baños: ${inmueble.banios}</p>
    <p class="parrafoDetalle">Cochera: ${estacionamiento}</p>    
    <p class="parrafoDetalle">Alquiler Mesual: $ ${inmueble.monto}</p>
    <p class="parrafoDetalle">Expensas Aprox: $ ${inmueble.expensas}</p></div>
    <img class="imgDetalle" src=${inmueble.img1}></div>`;
    //Lo tiro al body
    const body = document.querySelector("body");
    body.appendChild(tarjetaDetalle);

    //btn para cerrar
    const cerrarTarjeta = document.createElement("P");
    cerrarTarjeta.textContent = 'X';
    cerrarTarjeta.classList.add('btnCerrar');
    tarjetaDetalle.appendChild(cerrarTarjeta);

    //para cerrar la tarjeta
    cerrarTarjeta.addEventListener('click', function () {
        tarjetaDetalle.remove();
    });

}