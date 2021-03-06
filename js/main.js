/* Proyecto final JavaScript
   Buscador de Alquileres "El Hornerito" */

//============================CLASES========================================//
//Defino las clases USUARIO e INMUEBLE
class Usuario {
    constructor(idUsuario, nombreUsuario, apellidoUsuario, emailUsuario, passUsuario, publicacionesUsuario, favoritosUsuarios) {
        this.id = idUsuario;
        this.nombre = nombreUsuario;
        this.apellido = apellidoUsuario;
        this.email = emailUsuario;
        this.pass = passUsuario;
        this.publicaciones = publicacionesUsuario;
        this.favoritos = favoritosUsuarios;
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
}
//le doy formato a los numeros que representan dinero
const formato = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARG',
    minimumFractionDigits: 0,
})
//======================FIN CLASES==========================================//
//==========================VARIABLES GLOBALES==============================//
let Usuario1;
let arrayUsuarios = [];
let arrayDeptos = [];
let localidadesDisponibles = [];
let favoritos = [];
let publicados = [];

var formularioLogin = document.querySelector(".formularioLogin");
var formularioRegistro = document.querySelector(".formularioRegistro");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var cajaTrasera_login = document.querySelector(".cajaTrasera-login");
var cajaTrasera_register = document.querySelector(".cajaTrasera-register");
var buscarPublicar = document.querySelector("#buscarPublicar");
//===========================EVENTOS======================================//
document.getElementById("botonIrIniciarSesion").addEventListener("click", iniciarSesion);
document.getElementById("botonIrRegistrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);
const formPublicador = $("#formPublicar");
const formBuscador = $("#formBuscar");

//Para Registrasrse por primera vez
const formRegistro = $('#botonRegistrarse');
formRegistro.on('click', registroUsuario);
//Para el login
const formLogin = $('#botonLoguearse');
formLogin.on('click', loginUsuario);
//Eventos en botones para volver a form inicio
const botonVolverDeBusqueda = $("#volver");
const botonVolverDePublicar = $("#volver1");
botonVolverDeBusqueda.on('click', funcionVolverDeBusqueda);
botonVolverDePublicar.on('click', funcionVolverDePublicar);
//botones para publicar o buscar
const botonBuscar = $("#botonBuscar1");
const botonPublicar = $("#botonIrPublicar1");
botonBuscar.on('click', mostrarFormBusqueda);
botonPublicar.on('click', mostrarFormPublicar);

formPublicador.on('submit', validarFormPubli);
formBuscador.on('submit', validarFormBusca);
$("#contenedorbusqueda").hide();
$("#misPublicados").on('click', misPublicados);
$("#misFavoritos").on('click', misFavoritos);
$("#logout").on('click', salir);

//muestra el valor del range en el form buscar
$("#alqBuscar").change(function (e) {
    let valor = formato.format(e.target.value);
    $('#rangeAlq').text(`${valor}`)
});
$("#expBuscar").change(function (e) {
    let valor = formato.format(e.target.value);
    $('#rangeExp').text(`${valor}`)
});
//Jquery para el toggle del avatar(ver publicados y favoritos)
$("#avatar").click((e) => {
    e.stopPropagation();
    if (Usuario1 != undefined) {
        $("#colapsarAvatar").slideToggle("fast", "linear");
    }
});
$(document).on('click', function () {
    $("#colapsarAvatar").hide();
})
$("#LogReg").hide();
//===========================FUNCIONES======================================//
//vuelvo atras formulario buscar -> form identificacion
function funcionVolverDeBusqueda() {
    $("#contenedorLogin").show();
    formBuscador.addClass("ocultar");
};

function cargoPagina() {
    //Mientras se carga la pagina muestro una imagen
    $(window).on("load", function () {
        $(".carga").fadeOut(5000);
    });
};
//vuelvo atras formulario publicar -> form identificacion
function funcionVolverDePublicar() {
    $("#contenedorLogin").show();
    formPublicador.addClass("ocultar");
};
//responsive gral para los form de login-register
function anchoPage() {

    if (window.innerWidth > 768) {
        cajaTrasera_register.style.display = "block";
        cajaTrasera_login.style.display = "block";
    } else {
        cajaTrasera_register.style.display = "block";
        cajaTrasera_register.style.opacity = "1";
        cajaTrasera_login.style.display = "none";
        formularioLogin.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formularioRegistro.style.display = "none";
    }
};
//responsive para el login
function iniciarSesion() {
    if (window.innerWidth > 768) {
        formularioLogin.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formularioRegistro.style.display = "none";
        cajaTrasera_register.style.opacity = "1";
        cajaTrasera_login.style.opacity = "0";
    } else {
        formularioLogin.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formularioRegistro.style.display = "none";
        cajaTrasera_register.style.display = "block";
        cajaTrasera_login.style.display = "none";
    }
};
//responsive para el registro
function register() {
    if (window.innerWidth > 768) {
        formularioRegistro.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formularioLogin.style.display = "none";
        cajaTrasera_register.style.opacity = "0";
        cajaTrasera_login.style.opacity = "1";
    } else {
        formularioRegistro.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formularioLogin.style.display = "none";
        cajaTrasera_register.style.display = "none";
        cajaTrasera_login.style.display = "block";
        cajaTrasera_login.style.opacity = "1";
    }
};
//Eventos para comenzar la interaccion de usuario
function comenzar() {
    $("#botonComenzar").click(() => {
        $("#contenedorLogin").fadeIn();
        $("header").slideToggle("slow", "linear")
        $("#tituloNavbar").show();
        $("#contenedorbusqueda").hide();
        $("#LogReg").show();
    });
};
//Leo el Json online de Usuarios (API)--------------------------------------//
function leoJsonUsuarios() {
    let URLGET_USERS = "https://api.jsonbin.io/b/6134015a470d3325940285b2/latest";
    let misUsuarios = [];
    $.get(URLGET_USERS, function (respuesta1, estado1) {
        if (estado1 === "success") {
            misUsuarios = respuesta1;
        }
        for (let j = 0; j < misUsuarios.length; j++) {
            let nn = new Usuario(misUsuarios[j].id, misUsuarios[j].nombre, misUsuarios[j].apellido, misUsuarios[j].email, misUsuarios[j].pass, misUsuarios[j].publicaciones, misUsuarios[j].favoritos);
            arrayUsuarios.push(nn);
        }
    });
};
//Leo el json desde la API--------------------------------------------------//
function leerJSonPublicaciones() {
    //Leo el Json online de Inmuebles (API)
    const URLGET = "https://api.jsonbin.io/v3/b/61390c2a4a82881d6c4b6329/latest";
    let misDatos = [];
    $.get(URLGET, function (respuesta, estado) {
        if (estado === "success") {
            misDatos = respuesta.record;
        }
        for (let j = 0; j < misDatos.length; j++) {
            let monto = misDatos[j].monto.slice(4);
            monto = parseInt(monto.replace('.', ''));
            let expensas = misDatos[j].expensas.slice(4);
            expensas = expensas.replace('.', '');
            let nn = new Inmueble(misDatos[j].id, misDatos[j].tipo, misDatos[j].localidad, misDatos[j].uso, misDatos[j].habitaciones, misDatos[j].banios, misDatos[j].cochera, monto, expensas, misDatos[j].img1);

            arrayDeptos.push(nn);
            //cargo las localidades en un array para mostrarlas en mesplegable de busqueda
            localidadesDisponibles.push(nn.localidad);
        }

        //elimino localidades repetidas
        localidadesDisponibles = [...new Set(localidadesDisponibles)];
        //las cargo como opciones en menu desplegable de busqueda
        for (i = 0; i < localidadesDisponibles.length; i++) {
            $('#localidadInmueble').append(`<option value="${localidadesDisponibles[i]}">`);
        }
        // Cargo/Refresco el array completo de inmuebles
        cargoDeptos();
    });
};
//Registro para usuarios nuevos
function registroUsuario(e) {
    e.preventDefault();
    //tomo los datos ingresados en el formulario
    let nombre = document.getElementById("nombreUsuario").value;
    let apellido = document.getElementById("apellidoUsuario").value;
    let email = document.getElementById("correoUsuario").value;
    let pass1 = document.getElementById("pass1").value;
    let pass2 = document.getElementById("pass2").value;

    let publicaciones = [];
    let favoritos = [];

    if (nombre === '' || apellido === '' || email === '' || pass1 === '' || pass2 === '') {
        mostrarError('Todos los campos son obligatorios');
        return;
    }
    if (pass1.length < 6) {
        mostrarError('La contrase??a es corta (min. 6 caract)');
        return;
    }
    if (pass1 !== pass2) {
        mostrarError('Las contrase??as son distintas');
        return;
    }
    if (!email.includes('@')) {
        mostrarError('Verifique email');
        return;
    }
    for (let i = 0; i < arrayUsuarios.length; i++) {
        if (arrayUsuarios[i].email === email) {
            mostrarError('El Correo ya esta registrado');
            return;
        }
    }
    let idUsuario = arrayUsuarios.length + 1;
    let Usuario1 = new Usuario(idUsuario, nombre, apellido, email, pass1, publicaciones, favoritos);
    mostrarMensaje("Datos ingresados correctamente\nRecargando sitio");
    //meto el usuario identificado en el array de usuarios
    arrayUsuarios.push(Usuario1);
    let jj = JSON.stringify(arrayUsuarios);

    $.ajax({
        url: 'https://api.jsonbin.io/b/6134015a470d3325940285b2',
        contentType: 'application/json',
        method: 'PUT',
        //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
        data: jj
    }).done(function () {
        console.log('SUCCESS'); //verifico por consola si escribio bien los datos
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
};

function loginUsuario(e) {
    e.preventDefault();
    //tomo los datos ingresados en el formulario
    let email = document.getElementById("correoLogin").value;
    let pass = document.getElementById("passLogin").value;
    if (email === '' || pass === '') {
        mostrarError('Todos los campos son obligatorios');
        return;
    }
    //verifico si coinciden con algun usuario registrado
    for (let i = 0; i < arrayUsuarios.length; i++) {
        if (arrayUsuarios[i].email.includes(email) && arrayUsuarios[i].pass.includes(pass)) {
            //si hay coincidencia, se lo paso al usuario de la sesion          
            Usuario1 = arrayUsuarios[i];
            favoritos = Usuario1.favoritos;
            publicaciones = Usuario1.publicaciones;
            $("#misFavoritos").text('Favoritos [' + favoritos.length + ']');
            $("#misPublicados").text('Publicados [' + publicaciones.length + ']');

            // modifico el html con el nombre de usuario en la navbar
            let user = document.getElementById("username");
            user.textContent = Usuario1.nombre;
            //le agrego el avatar del carpincho
            let avatar = document.getElementById("avatar");
            avatar.src = 'media/img/carpincho.svg';

            mostrarMensaje("Datos ingresados correctamente");
            return;
        } else if (i == arrayUsuarios.length - 1) {
            mostrarError('El Usuario no existe');
        }
    }

};
//------------------------------VALIDACIONES--------------------------------//
//----------Mensajes de Error y Validaci??n correcta en forms----------------//
function mostrarError(mensaje) {
    $('#formularioInicio').append(`<p id="error" class='error'> ${mensaje} </p>`);
    $('#formularioLogin').append(`<p id="error" class='error'> ${mensaje} </p>`);
    $('#formularioRegistro').append(`<p id="error" class='error'> ${mensaje} </p>`);
    //mensaje dura 3 seg
    setTimeout(() => {
        error = $(".error");
        error.remove();
    }, 3000);
};

function mostrarMensaje(mensaje) {
    $('#formularioRegistro').append(`<p id="ok" class='alerta'> ${mensaje} </p>`);
    $('#formularioLogin').append(`<p id="ok" class='alerta'> ${mensaje} </p>`);
    //mensaje dura 5 seg
    setTimeout(() => {
        msj = $("#ok");
        msj.remove();
        $("#formularioLogin").hide();
        if (Usuario1 != undefined) {
            $(".cajaTrasera").hide();
            $(".contenedorRegistroLogin").hide();
            $("#formularioLogin").hide();
            $("#buscarPublicar").show();
        }
        if (Usuario1 == undefined) {
            location.reload(); //recarga la pagina para poder loguearse
        }
    }, 2000);
};
//------------------------FORMULARIO PARA PUBLICAR--------------------------//
function mostrarFormPublicar() {
    $("#contenedorLogin").hide();
    formPublicador.removeClass("ocultar");
};

function validarFormPubli(e) {
    e.preventDefault();
    //tomo los datos ingresados en el formulario
    let tipoInmueble = document.getElementById("tipoInmueblePublicar").value;
    let localidad = document.getElementById("localidadInmueblePublicar").value;
    let tipoUsos = document.getElementById("tipoUsosPublicar").value;
    let habs = document.getElementById("cantHabsPublicar").value;
    let banios = document.getElementById("cantBaniosPublicar").value;
    let cochera = document.getElementById("cocheraPublicar").checked;
    let alq = document.getElementById("costoAlqPublicar").value;
    let exp = document.getElementById("costoExpPublicar").value;
    let foto = document.getElementById("imagen").value;
    //cambio la ruta por una conocida sino me tira error el servidor
    // magia para poner foto de un deto, casa o local segun se introduce en el form
    let ran1 = random(1, 20);
    let ran2 = random(1, 10);
    let ran3 = random(1, 4);
    if (tipoInmueble == 'Departamento') {
        foto = 'media/img/inmuebles/depto' + ran1 + 't.jpg';
    }
    if (tipoInmueble == 'Casa') {
        foto = 'media/img/inmuebles/casa' + ran2 + 't.jpg';
    }
    if (tipoUsos == 'Local Comercial') {
        foto = 'media/img/inmuebles/local' + ran3 + 't.jpg';
    }
    if (tipoInmueble === '' || localidad === '' || tipoUsos === '' || habs === '' || banios === '' || cochera === '' || alq === '' || exp === '') {
        mostrarErrorPubli('Todos los campos son obligatorios');
        return;
    }
    //le asigno el id teniendo el ultimo id del arreglo del arreglo de inmuebles
    let id = parseInt(arrayDeptos[arrayDeptos.length - 1].id) + 1;
    //Instancio el objeto con los datos ingresados
    let nuevoInmueble = new Inmueble(id, tipoInmueble, localidad, tipoUsos, habs, banios, cochera, alq, exp, foto);
    let fecha = Date.now();
    //Cargo el inmueble publicado en el usuario correspondiente
    Usuario1.publicaciones.push(id);
    $("#misPublicados").text('Publicados [' + publicaciones.length + ']');
    let fechaPublicacion = new Date(fecha);
    //lo ingreso al array de inmueble
    arrayDeptos.push(nuevoInmueble);

    mostrarMensajePubli("El inmueble se public?? correctamente", nuevoInmueble);
    //muestro el depto publicado
    mostrarPublicado(nuevoInmueble);
    //recargo las tarjetas con todos los deptos actualizados, incluso el recien ingresado
    cargoDeptos();
    //-----------guardo el array de Deptos nuevo en la API
    let jj = JSON.stringify(arrayDeptos);
    $.ajax({
        url: 'https://api.jsonbin.io/b/61390c2a4a82881d6c4b6329',
        contentType: 'application/json',
        method: 'PUT',
        //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
        data: jj
    }).done(function () {
        console.log('SUCCESS'); //veo por consola si actualizo bien
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
    //----------actualizo al usuario
    let kk = JSON.stringify(arrayUsuarios);
    $.ajax({
        url: 'https://api.jsonbin.io/b/6134015a470d3325940285b2',
        contentType: 'application/json',
        method: 'PUT',
        //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
        data: kk
    }).done(function () {
        console.log('SUCCESS'); //verifico por consola si escribio bien los datos
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
    $("#formPublicar")[0].reset();
};

function mostrarErrorPubli(mensaje) {
    $('#formPublicar').append(`<p id="error" class='error'> ${mensaje} </p>`);
    //mensaje dura 3 seg
    setTimeout(() => {
        error = $(".error");
        error.remove();
    }, 3000);
};

function mostrarMensajePubli(mensaje, inmueble) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    formPublicador.append(alerta);
    formBuscador.append(alerta);
    //mensaje dura 5 seg
    setTimeout(() => {
        alerta.remove();
        //formPublicador.remove();
    }, 1000);

};
//------------------------FORMULARIO PARA BUSCAR----------------------------//
function mostrarFormBusqueda() {
    $("#contenedorLogin").hide();
    formBuscador.removeClass("ocultar");
};

function validarFormBusca(e) {
    e.preventDefault();
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
    muestroDeptos(localidad, tipoInmueble, tipoUsos, habs, banios, cochera, alq, exp);
    $("#formBuscar")[0].reset();
};

function mostrarErrorBusqueda(mensaje) {
    $('#formBuscar').append(`<p id="error" class='error'> ${mensaje} </p>`);
    //mensaje dura 3 seg
    setTimeout(() => {
        error = $(".error");
        error.remove();
    }, 3000);
};
//--------------------------FUNCIONES PARA UTILIDADES-----------------------//
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
};
//----------------------------Resultados Busqueda---------------------------//
function muestroDeptos(localidad, tipoInmueble, tipoUsos, habs, banios, cochera, alq, exp) {
    $("#contenedorbusqueda").show();
    //traigo el id del titulo de la seccion y lo muestro
    var titulo = document.getElementById("tituloBusqueda");
    titulo.classList.remove("ocultar");
    $("#tituloBusqueda").text('Resultados B??squeda');
    let resultBusq = document.getElementById("busqueda");
    //hago esto para resetear la seccion por si tenia busquedas anteriores
    resultBusq.innerHTML = ` `;

    //array para guardar lo filtrado    
    let resultadoBusqueda = [];
    //Filtro de b??squeda
    resultadoBusqueda = arrayDeptos.filter(busqueda => busqueda.localidad == localidad && busqueda.tipo === tipoInmueble && busqueda.uso === tipoUsos && busqueda.habitaciones <= habs && busqueda.banios <= banios && busqueda.cochera == cochera && parseInt(busqueda.monto.slice(4).replace('.', '')) <= parseInt(alq) && parseInt(busqueda.expensas.slice(4).replace('.', '')) <= parseInt(exp));

    if (resultadoBusqueda.length == 0) {
        let contenedor = document.createElement("div");
        //contenedor.classList.add('tarjetaDeptoBusqueda');
        contenedor.innerHTML = `<div class="contenedorBuscarPublicar"><h2 class="parrafoDetalle centrar-texto">No se han encontrado resultados</h2>
        <p class="parrafoDetalle centrar-texto"> Intent?? modificando la b??squeda</p></div>`;
        resultBusq.appendChild(contenedor);
    }
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
        //obtengo el elemento(un boton) por si id
        let detalles = document.getElementById(identificador);
        //lo dejo a la escucha de un click y que ejecute la funcion mostrarDetallesBusqueda
        detalles.addEventListener('click', mostrarDetallesBusqueda);
    }
};
//----------Muestra 10 deptos al final del body-----------------------------//
function cargoDeptos() {
    //saco los primeros 8 deptos cargados del total de publicaciones
    let aux = arrayDeptos.slice(-8);
    aux.reverse();
    let muestras = document.getElementById("contenedorMuestras");
    muestras.innerHTML = ` `;
    for (const inmueble of aux) {
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

        //obtengo el elemento(un boton) por si id
        let detalles = document.getElementById(identificador);

        //lo dejo a la escucha de un click y que ejecute la funcion mostrarDetalles
        detalles.addEventListener('click', mostrarDetalles);
    }
}
//--------------modal para mostrar los detalles de la busqueda--------------//
function mostrarDetallesBusqueda(e) {
    //guardo el id del boton
    let id = e.target.id;
    //expresion regular
    var regex = /(\d+)/g;
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));

    let aux = arrayDeptos.filter(ee => ee.id == nro);
    let propiedad = aux[0];
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
    tarjetaDetalle.innerHTML = `<div class="detalles">
    <p class="parrafoDetalle">Resultado de B??squeda</p>
    <p class="parrafoDetalle">${propiedad.localidad}</p>
        <h3>Tipo:${propiedad.tipo}</h3>  
        <p class="parrafoDetalle">Tipo de Uso: ${propiedad.uso}</p>    
        <p class="parrafoDetalle">Cantidad de habitaciones: ${propiedad.habitaciones}</p>
        <p class="parrafoDetalle">Cantidad de ba??os: ${propiedad.banios}</p>
        <p class="parrafoDetalle">Cochera: ${estacionamiento}</p>    
        <p class="parrafoDetalle">Alquiler Mesual: $ ${propiedad.monto}</p>
        <p class="parrafoDetalle">Expensas Aprox: $ ${propiedad.expensas}</p>
        <button id="btnFav" class="parrafoDetalle boton"> Agregar a Favoritos</button></div>
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
    //para agregar a favoritos
    let agregarDepto = document.getElementById("btnFav");
    if (Usuario1.favoritos.includes(propiedad.id)) {
        $("#btnFav").text('En Favoritos');
    };

    agregarDepto.addEventListener('click', function () {
        if (!Usuario1.favoritos.includes(propiedad.id)) {
            Usuario1.favoritos.push(propiedad.id);
            $("#btnFav").text('En Favoritos');

            let jj = JSON.stringify(arrayUsuarios);

            $.ajax({
                url: 'https://api.jsonbin.io/b/6134015a470d3325940285b2',
                contentType: 'application/json',
                method: 'PUT',
                //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
                data: jj
            }).done(function () {
                console.log('SUCCESS'); //verifico por consola si escribio bien los datos
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                console.log('ALWAYS');
            });
        } else {
            $("#btnFav").text('En Favoritos');
        }
        $("#misFavoritos").text('Favoritos [' + favoritos.length + ']');
    })


};
//--------------modal para mostrar los detalles del Favorito----------------//
function mostrarDetallesFavorito(e) {
    //guardo el id del boton
    let id = e.target.id;
    //expresion regular
    var regex = /(\d+)/g;
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));
    let aux = arrayDeptos.filter(ee => ee.id == nro);
    let propiedad = aux[0];
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
    tarjetaDetalle.innerHTML = `<div class="detalles">
    <p class="parrafoDetalle">Resultado de B??squeda</p>
    <p class="parrafoDetalle">${propiedad.localidad}</p>
        <h3>Tipo:${propiedad.tipo}</h3>  
        <p class="parrafoDetalle">Tipo de Uso: ${propiedad.uso}</p>    
        <p class="parrafoDetalle">Cantidad de habitaciones: ${propiedad.habitaciones}</p>
        <p class="parrafoDetalle">Cantidad de ba??os: ${propiedad.banios}</p>
        <p class="parrafoDetalle">Cochera: ${estacionamiento}</p>    
        <p class="parrafoDetalle">Alquiler Mesual: $ ${propiedad.monto}</p>
        <p class="parrafoDetalle">Expensas Aprox: $ ${propiedad.expensas}</p>
        <button id="btnFav" class="parrafoDetalle boton"> Eliminar</button></div>
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
    //para eliminar a favoritos
    let eliminoDepto = document.getElementById("btnFav");
    if (Usuario1.favoritos.includes(propiedad.id)) {
        $("#btnFav").text('Eliminar');
    };

    eliminoDepto.addEventListener('click', function () {
        if (Usuario1.favoritos.includes(propiedad.id)) {
            Usuario1.favoritos.pop(propiedad.id);
            $("#btnFav").text('Eliminado');

            let jj = JSON.stringify(arrayUsuarios);

            $.ajax({
                url: 'https://api.jsonbin.io/b/6134015a470d3325940285b2',
                contentType: 'application/json',
                method: 'PUT',
                //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
                data: jj
            }).done(function () {
                console.log('SUCCESS'); //verifico por consola si escribio bien los datos
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                console.log('ALWAYS');
            });
        } else {
            $("#btnFav").text('Agregar a Favoritos');
        }
        $("#misFavoritos").text('Favoritos [' + favoritos.length + ']');
        misFavoritos();
    })


};
//--------------modal para mostrar los detalles del Publicado----------------//
function mostrarDetallesPublicado(e) {
    //guardo el id del boton
    let id = e.target.id;
    //expresion regular
    var regex = /(\d+)/g;
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));

    //busco y defino la propiedad segun el id
    let aux = arrayDeptos.filter(ee => ee.id == nro);
    let propiedad = aux[0];

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
    tarjetaDetalle.innerHTML = `<div class="detalles">
    <h3 class="parrafoDetalle">Inmueble Publicado</h3>
    <p class="parrafoDetalle">${propiedad.localidad}</p>
        <h3>Tipo:${propiedad.tipo}</h3>  
        <p class="parrafoDetalle">Tipo de Uso: ${propiedad.uso}</p>    
        <p class="parrafoDetalle">Cantidad de habitaciones: ${propiedad.habitaciones}</p>
        <p class="parrafoDetalle">Cantidad de ba??os: ${propiedad.banios}</p>
        <p class="parrafoDetalle">Cochera: ${estacionamiento}</p>    
        <p class="parrafoDetalle">Alquiler Mesual: $ ${propiedad.monto}</p>
        <p class="parrafoDetalle">Expensas Aprox: $ ${propiedad.expensas}</p>
        <button id="btnPub" class="parrafoDetalle boton"> Eliminar</button></div>
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
    //para eliminar el depto Publicado
    let eliminoDepto = document.getElementById("btnPub");
    if (Usuario1.publicaciones.includes(propiedad.id)) {
        $("#btnPub").text('Eliminar');
    };

    eliminoDepto.addEventListener('click', function () {
        if (Usuario1.publicaciones.includes(propiedad.id)) {
            Usuario1.publicaciones.splice(propiedad.id, 1);

            let aux2 = arrayDeptos.filter(ee => ee.id != nro);
            arrayDeptos = aux2;
            //y en el array de Usuarios para actualizar el json
            arrayUsuarios[Usuario1.id].publicaciones = arrayUsuarios[Usuario1.id].publicaciones.filter(publicaciones => publicaciones != propiedad.id);
            $("#btnFav").text('Eliminado');

            //actualizo el array de publicados del usuario
            let jj = JSON.stringify(arrayUsuarios);
            $.ajax({
                url: 'https://api.jsonbin.io/b/6134015a470d3325940285b2',
                contentType: 'application/json',
                method: 'PUT',
                //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
                data: jj
            }).done(function () {
                console.log('SUCCESS'); //verifico por consola si escribio bien los datos
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                console.log('ALWAYS');
            });
            //actualizo los deptos (elimino el eliminado)
            let kk = JSON.stringify(arrayDeptos);
            $.ajax({
                url: 'https://api.jsonbin.io/b/61390c2a4a82881d6c4b6329',
                contentType: 'application/json',
                method: 'PUT',
                //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
                data: kk
            }).done(function () {
                console.log('SUCCESS'); //veo por consola si actualizo bien
            }).fail(function (msg) {
                console.log('FAIL');
            }).always(function (msg) {
                console.log('ALWAYS');
            });
        } else {
            $("#btnFav").text('Eliminado');
        }
        $("#misPublicados").text('Publicados [' + Usuario1.publicaciones.length + ']');
        misPublicados();
    })
};
//--------------modal para mostrar el detalle de los deptos-----------------//
function mostrarDetalles(e) {
    //guardo el id del boton
    let id = e.target.id;
    //expresion regular
    var regex = /(\d+)/g;
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));
    //busco y defino la propiedad segun el id
    let aux = arrayDeptos.filter(ee => ee.id == nro);
    let propiedad = aux[0];
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
    <p class="parrafoDetalle">Cantidad de ba??os: ${propiedad.banios}</p>
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

};
//-----------------modal que muestra el depto recien publicado--------------//
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
    tarjetaDetalle.innerHTML = `<div><h3 class="parrafoDetalle">ACABAS DE PUBLICAR</h3>
    <p class="parrafoDetalle">${inmueble.localidad}</p>
    <h3>Tipo:${inmueble.tipo}</h3>  
    <p class="parrafoDetalle">Tipo de Uso: ${inmueble.uso}</p>    
    <p class="parrafoDetalle">Cantidad de habitaciones: ${inmueble.habitaciones}</p>
    <p class="parrafoDetalle">Cantidad de ba??os: ${inmueble.banios}</p>
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

};
//----------------------------mis Publicados--------------------------------//
function misPublicados() {
    $("#contenedorbusqueda").show();
    $("#formularioLogin").hide();
    //traigo el id del titulo de la seccion y lo muestro
    var titulo = document.getElementById("tituloBusqueda");
    titulo.classList.remove("ocultar");
    $("#tituloBusqueda").text('Mis Publicaciones');
    //titulo.textContent('Mis Publicaciones');
    let resultBusq = document.getElementById("busqueda");
    //hago esto para resetear la seccion por si tenia busquedas anteriores
    resultBusq.innerHTML = ` `;

    //array para guardar lo filtrado    
    let misDeptosId = Usuario1.publicaciones;

    if (misDeptosId.length == 0) {
        resultBusq.innerHTML = `<div class="contenedorBuscarPublicar"><p class="parrafoDetalle">No tenes Inmuebles Publicados</p>
        </div>`;
    }

    //busqueda es el id de <section> dentro del cual quiero insertar las tarjetas  

    for (let i = 0; i < arrayDeptos.length; i++) {
        if (misDeptosId.includes(arrayDeptos[i].id)) {
            let elemento = arrayDeptos[i];
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

            //obtengo el elemento(un boton) por si id
            let detalles = document.getElementById(identificador);

            //lo dejo a la escucha de un click y que ejecute la funcion mostrarDetallesBusqueda
            detalles.addEventListener('click', mostrarDetallesPublicado);


        } //cierra if
    } //cierra for
};
//----------------------------mis Favoritos---------------------------------//
function misFavoritos() {
    $("#contenedorbusqueda").show();
    $("#formularioLogin").hide();
    //traigo el id del titulo de la seccion y lo muestro
    var titulo = document.getElementById("tituloBusqueda");
    titulo.classList.remove("ocultar");
    $("#tituloBusqueda").text('Mis Favoritos');

    let resultBusq = document.getElementById("busqueda");
    //hago esto para resetear la seccion por si tenia busquedas anteriores
    resultBusq.innerHTML = ` `;


    //array para guardar lo filtrado    
    let misDeptosId = Usuario1.favoritos;
    if (misDeptosId.length == 0) {
        resultBusq.innerHTML = `<div class="contenedorBuscarPublicar"><p class="parrafoDetalle">No tenes Inmuebles guardados en Favoritos</p>
        <p class="parrafoDetalle"> Busca los inmuebles que te gustan y guardalos como favoritos</p></div>`;
    }

    //busqueda es el id de <section> dentro del cual quiero insertar las tarjetas  

    for (let i = 0; i < arrayDeptos.length; i++) {
        if (misDeptosId.includes(arrayDeptos[i].id)) {
            let elemento = arrayDeptos[i];
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

            //obtengo el elemento(un boton) por si id
            let detalles = document.getElementById(identificador);

            //lo dejo a la escucha de un click y que ejecute la funcion mostrarDetallesBusqueda
            detalles.addEventListener('click', mostrarDetallesFavorito);


        } //cierra if
    } //cierra for
};
//---------------------------Salir------------------------------------------//
function salir() {
    location.reload();
}
//muestra en el body estadisticas del sitio
function numeros() {
    $("#contenedorbusqueda").show();
    let resultBusq = document.getElementById("busqueda");
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `<div class="contenidoEst">
                            <div class="contenedorNro">
                            <h2 id="numeroUsuarios" class="contador">00</h2>
                            <p class="parrafoNro">Usuarios Registrados</p>
                            </div>
                            <div class="contenedorNro">
                            <h2 id="numeroInmuebles" class="contador">00</h2>
                            <p class="parrafoNro">Inmuebles Publicados</p>
                            </div>
                            <div class="contenedorNro">
                            <h2 id="numeroLocalidades" class="contador">00</h2>
                            <p class="parrafoNro">Localidades</p>
                            </div>
                            </div>`;
    resultBusq.appendChild(contenedor);
    let numero = document.getElementById("numeroUsuarios");
    let cant1 = 0;
    let cant2 = 0;
    let cant3 = 0
    let tiempo = setInterval(() => {
        cant1 += 1;
        cant2 += 4;
        cant3 += 1;
        $("#numeroInmuebles").text(cant2);
        if (cant1 < arrayUsuarios.length) {
            $("#numeroUsuarios").text(cant1);
        } else {
            $("#numeroUsuarios").text(arrayUsuarios.length);
        }
        if (cant2 < arrayDeptos.length) {
            $("#numeroInmuebles").text(cant2);
        } else {
            $("#numeroInmuebles").text(arrayDeptos.length);
        }
        if (cant3 < localidadesDisponibles.length) {
            $("#numeroLocalidades").text(cant3);
        } else {
            $("#numeroLocalidades").text(localidadesDisponibles.length);
        }
        if (cant2 == arrayDeptos.length || cant1 == arrayUsuarios.lenght) {
            clearInterval(tiempo);
        }
    }, 160)
}
//===========================IMPLEMENTO FUNCIONES===========================//
cargoPagina();
anchoPage();
leoJsonUsuarios();
leerJSonPublicaciones();
numeros();
comenzar();