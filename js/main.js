/* Proyecto final JavaScript
   Buscador de Alquileres "El Hornerito" */

function cargoPagina(){
    //Mientras se carga la pagina muestro una imagen
    $(window).on("load", function () {
        $(".carga").fadeOut(1000);
    });
};
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
let arrayUsuarios =[];
let arrayDeptos = [];
let localidadesDisponibles = [];
//==========================================================================//
//Ejecutando funciones
document.getElementById("botonIrIniciarSesion").addEventListener("click", iniciarSesion);
document.getElementById("botonIrRegistrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);
//Declarando variables
var formularioLogin = document.querySelector(".formularioLogin");
var formularioRegistro = document.querySelector(".formularioRegistro");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var cajaTrasera_login = document.querySelector(".cajaTrasera-login");
var cajaTrasera_register = document.querySelector(".cajaTrasera-register");
var buscarPublicar = document.querySelector("#buscarPublicar");

function anchoPage(){

    if (window.innerWidth > 850){
        cajaTrasera_register.style.display = "block";
        cajaTrasera_login.style.display = "block";
    }else{
        cajaTrasera_register.style.display = "block";
        cajaTrasera_register.style.opacity = "1";
        cajaTrasera_login.style.display = "none";
        formularioLogin.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formularioRegistro.style.display = "none";   
    }
}
function iniciarSesion(){
    if (window.innerWidth > 850){
        formularioLogin.style.display = "block";
        contenedor_login_register.style.left = "10px";
        formularioRegistro.style.display = "none";
        cajaTrasera_register.style.opacity = "1";
        cajaTrasera_login.style.opacity = "0";
    }else{
        formularioLogin.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formularioRegistro.style.display = "none";
        cajaTrasera_register.style.display = "block";
        cajaTrasera_login.style.display = "none";
    }
}
function register(){
    if (window.innerWidth > 850){
        formularioRegistro.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formularioLogin.style.display = "none";
        cajaTrasera_register.style.opacity = "0";
        cajaTrasera_login.style.opacity = "1";
    }else{
        formularioRegistro.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formularioLogin.style.display = "none";
        cajaTrasera_register.style.display = "none";
        cajaTrasera_login.style.display = "block";
        cajaTrasera_login.style.opacity = "1";
    }
}
//=============================EVENTOS======================================//
//------------Eventos en formularios(cambie algunos a JQUERY)---------------//
const formInicio = $('#formularioInicio');
const formPublicador = $("#formPublicar");
const formBuscador = $("#formBuscar");

//Para Registrasrse por primera vez
const formRegistro =$('#botonRegistrarse');
formRegistro.on('click', registroUsuario);
//Para el login
const formLogin =$('#botonLoguearse');
formLogin.on('click', loginUsuario);

//Eventos en botones para volver a form inicio
const botonVolverDeBusqueda = $("#volver");
const botonVolverDePublicar = $("#volver1");

const botonBuscar = $("#botonBuscar1");
const botonPublicar = $("#botonIrPublicar1");

formInicio.on('submit', validarForm);
formPublicador.on('submit', validarFormPubli);
formBuscador.on('submit', validarFormBusca);
botonVolverDeBusqueda.on('click', funcionVolverDeBusqueda);
botonVolverDePublicar.on('click', funcionVolverDePublicar);

botonBuscar.on('click',mostrarFormBusqueda);
botonPublicar.on('click',mostrarFormPublicar);

//muestra el valor del range en el form buscar
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
    //$("#contenedorLogin").toggle("slow", "linear");
});
//Jquery para el toggle del avatar(ver publicados y favoritos)
$("#avatar").click(() => {
    $("#colapsarAvatar").slideToggle("fast", "linear");
});
//vuelvo atras formulario buscar -> form identificacion
function funcionVolverDeBusqueda() {
    $("#contenedorLogin").show();
    formBuscador.addClass("ocultar");
}
//vuelvo atras formulario publicar -> form identificacion
function funcionVolverDePublicar() {
    $("#contenedorLogin").show();
    formPublicador.addClass("ocultar");
}
//===========================FUNCIONES======================================//
//Leo el Json online de Usuarios (API)
function leoJsonUsuarios() {    
    let URLGET_USERS = "https://api.jsonbin.io/b/6134015a470d3325940285b2/latest";
    let misUsuarios = [];
    $.get(URLGET_USERS, function (respuesta1, estado1) {
        if (estado1 === "success") {
            misUsuarios = respuesta1;
            //console.log("misUsuarios", misUsuarios);
        }
        for (let j = 0; j < misUsuarios.length; j++) {
            let nn = new Usuario(misUsuarios[j].id, misUsuarios[j].nombre, misUsuarios[j].apellido, misUsuarios[j].email, misUsuarios[j].pass, misUsuarios[j].publicaciones, misUsuarios[j].favoritos);
            arrayUsuarios.push(nn);                        
        }
        //console.log(arrayUsuarios);
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
            console.log('misDatos', misDatos);
        }
        for (let j = 0; j < misDatos.length; j++) {
            let monto = misDatos[j].monto.slice(4);
            monto = parseInt(monto.replace('.',''));
            let expensas = misDatos[j].expensas.slice(4);
            expensas = expensas.replace('.','');
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
}
//Registro para usuarios nuevos
function registroUsuario(e){
    e.preventDefault();
    //tomo los datos ingresados en el formulario
    let nombre = document.getElementById("nombreUsuario").value;
    let apellido = document.getElementById("apellidoUsuario").value;
    let email = document.getElementById("correoUsuario").value;
    let pass1 = document.getElementById("pass1").value;
    let pass2 = document.getElementById("pass2").value;
    
    let publicaciones = [];
    let favoritos = [];   

    if (nombre === '' || apellido === '' || email === '' || pass1 === '' || pass2==='' ) {
        mostrarError('Todos los campos son obligatorios');        
        return;
    }
    if (pass1 !== pass2) {
        mostrarError('Las contraseñas son distintas');        
        return;
    }
    for(let i=0; i< arrayUsuarios.length; i++){
        if(arrayUsuarios[i].email === email){
            mostrarError('El Correo ya esta registrado');
            return;
        }
    }
    let idUsuario = arrayUsuarios.length + 1;
    let Usuario1 = new Usuario(idUsuario, nombre, apellido, email, pass1, publicaciones, favoritos);
    mostrarMensaje("Datos ingresados correctamente\nRecargando sitio");
    console.log('usuario registrado', Usuario1);
    

    //meto el usuario identificado en el array de usuarios
    arrayUsuarios.push(Usuario1);
    let jj = JSON.stringify(arrayUsuarios);
    console.log('arrayUsuariosString', jj);
    $.ajax({
        url: 'https://api.jsonbin.io/b/6134015a470d3325940285b2',
        contentType: 'application/json',
        method: 'PUT',
        //XMasterKey: '$2b$10$JP7lQa.UN5cW6CuENZFXwefu.tNQ4cvGdj4scjZQejqb5n8XIcOXa',        
        data: jj        
    }).done(function () {
        console.log('SUCCESS');//verifico por consola si escribio bien los datos
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });    
}
function loginUsuario(e){
    e.preventDefault();
    //tomo los datos ingresados en el formulario
    let email = document.getElementById("correoLogin").value;
    let pass = document.getElementById("passLogin").value;
    
    //verifico si coinciden con algun usuario registrado
    for(let i=0; i<arrayUsuarios.length; i++){
        if(arrayUsuarios[i].email.includes(email) && arrayUsuarios[i].pass.includes(pass)){  
            //si hay coincidencia, se lo paso al usuario de la sesion          
            Usuario1 = arrayUsuarios[i];   
            console.log(Usuario1);
            //Usuario1.favoritos.push = 1;
            
            // modifico el html con el nombre de usuario en la navbar
            let user = document.getElementById("username");
            user.textContent = Usuario1.nombre;
            //le agrego el avatar del carpincho
            let avatar = document.getElementById("avatar");
            avatar.src = 'media/img/carpincho.svg';

            mostrarMensaje("Datos ingresados correctamente");
            return;
        }else if(i == arrayUsuarios.length - 1){
            mostrarError('El Usuario no existe');
        }
    }

}
//------------------------------VALIDACIONES--------------------------------//
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
    Usuario1 = new Usuario(nuevoId, nombre, apellido, localidad, email, telefono, tipo, [], []);
    //formulario correcto
    mostrarMensaje("Datos ingresados correctamente", Usuario1);

    // modifico el html con el nombre de usuario en la navbar
    let user = document.getElementById("username");
    user.textContent = nombre;
    //le agrego el avatar del carpincho
    let avatar = document.getElementById("avatar");
    avatar.src = 'media/img/carpincho.svg';
    //meto el usuario identificado en el array de usuarios
    arrayUsuarios.push(Usuario1);
    
    //-----------guardo el array nuevo en la API
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
//----------Mensajes de Error y Validación correcta en forms----------------//
function mostrarError(mensaje) {
    $('#formularioInicio').append(`<p id="error" class='error'> ${mensaje} </p>`);
    $('#formularioLogin').append(`<p id="error" class='error'> ${mensaje} </p>`);
    $('#formularioRegistro').append(`<p id="error" class='error'> ${mensaje} </p>`);
    //mensaje dura 3 seg
    setTimeout(() => {
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
function mostrarMensaje(mensaje) {
    $('#formularioRegistro').append(`<p id="ok" class='alerta'> ${mensaje} </p>`);
    $('#formularioLogin').append(`<p id="ok" class='alerta'> ${mensaje} </p>`);
    // const alerta = document.createElement('P');
    // alerta.textContent = mensaje;
    // alerta.classList.add('alerta');
    // formInicio.append(alerta);
    //mensaje dura 5 seg
    setTimeout(() => {
        msj = $("#ok");
        msj.remove();
        if(Usuario1 != undefined){
            contenedor_login_register.style.display = "none";
            cajaTrasera_login.style.display = "none";
            cajaTrasera_register.style.display = "none";
            buscarPublicar.style.display= "block";
            formInicio.addClass("ocultar");
        }
        if(Usuario1 == undefined){
            location.reload();
        }
    }, 2000);
}
//------------------------FORMULARIO PARA PUBLICAR--------------------------//
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
    let foto = document.getElementById("imagen").value;
    //cambio la ruta por una conocida sino me tira error el servidor
    foto = 'media/img/inmuebles/depto2t.jpg';
    if (tipoInmueble === '' || localidad === '' || tipoUsos === '' || habs === '' || banios === '' || cochera === '' || alq === '' || exp === '') {
        mostrarErrorPubli('Todos los campos son obligatorios');
        return;
    }
    //le asigno el id teniendo en cuenta la longitud del arreglo de inmuebles
    let id = arrayDeptos.length + 1;
    //Instancio el objeto con los datos ingresados
    let nuevoInmueble = new Inmueble(id, tipoInmueble, localidad, tipoUsos, habs, banios, cochera, alq, exp, foto);
    let fecha = Date.now();
    let fechaPublicacion = new Date(fecha);
    //lo ingreso al array de inmueble
    arrayDeptos.push(nuevoInmueble);
    mostrarMensajePubli("El inmueble se publicó correctamente", nuevoInmueble);
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
            console.log('SUCCESS');
        }).fail(function (msg) {
            console.log('FAIL');
        }).always(function (msg) {
            console.log('ALWAYS');
        });
        //----------
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
        //formPublicador.remove();
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
//------------------------FORMULARIO PARA BUSCAR----------------------------//
function mostrarFormBusqueda(){
    $("#contenedorLogin").hide();
    formBuscador.removeClass("ocultar");
}
function mostrarFormPublicar(){
    $("#contenedorLogin").hide();
    formPublicador.removeClass("ocultar");
}
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
    //let id = 0;
    //let img = ' ';
    //let busqueda = new Inmueble(id, tipoInmueble, localidad, tipoUsos, habs, banios, cochera, alq, exp, img);
    muestroDeptos(localidad, tipoInmueble);
}
//--------------------------FUNCIONES PARA UTILIDADES-----------------------//
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//----------------------------Resultados Busqueda---------------------------//
function muestroDeptos(localidad, tipoInmueble) {
    //traigo el id del titulo de la seccion y lo muestro
    var titulo = document.getElementById("tituloBusqueda");
    titulo.classList.remove("ocultar");
    let resultBusq = document.getElementById("busqueda");
    //hago esto para resetear la seccion por si tenia busquedas anteriores
    resultBusq.innerHTML = ` `;


    //array para guardar lo filtrado    
    let resultadoBusqueda = [];
    //Filtro de búsqueda (por ahora dejo solo por localidad por razones de prueba, tengo pocos inmuebles cargados)
    resultadoBusqueda = arrayDeptos.filter(busqueda => busqueda.localidad == localidad /*&& busqueda.tipo === tipoInmueble*/ );
    //resultadoBusqueda = filtroBusqueda;
    //console.log('filtroBusqueda', filtroBusqueda);
    console.log('resultadoBusqueda', resultadoBusqueda);
    //busqueda es el id de <section> dentro del cual quiero insertar las tarjetas  

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
//----------Muestra los ultimo 10 deptos publicados al final del body-------//
function cargoDeptos() {
    //saco los primeros 10 deptos cargados del total de publicaciones
    let aux = arrayDeptos.reverse();
    let deptoMuestra = aux.slice(0, 10);
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
//--------------modal para mostrar los detalles de la busqueda--------------//
function mostrarDetallesBusqueda(e) {
    //guardo el id del boton
    let id = e.target.id;
    console.log('id cliqueado', id);
    //expresion regular
    var regex = /(\d+)/g;    
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));
    console.log('id despues de regex', nro);
    //mis id de inmueble arrancan en 1, por eso el -1
    let propiedad = arrayDeptos[nro - 1];
    console.log(propiedad);
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
    <p class="parrafoDetalle">Resultado de Búsqueda</p>
    <p class="parrafoDetalle">${propiedad.localidad}</p>
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
//--------------modal para mostrar el detalle de los deptos-----------------//
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
//===========================IMPLEMENTO FUNCIONES===========================//
//implemento leer json de Deptos(leo lo local y lo de la API)
cargoPagina();
anchoPage();
leoJsonUsuarios();
leerJSonPublicaciones ()
