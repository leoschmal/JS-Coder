/* Proyecto final JavaScript
   Buscador de ALquileres "El Hornerito" */
//Creo las clases USUARIO e INMUEBLE
$(window).on("load", function() {
    $(".jm-loadingpage").fadeOut(6000);
   });

class Usuario {
    constructor(nombreUsuario, apellidoUsuario, localidadUsuario, emailUsuario, telefonoUsuario, tipoUsuario) {
        this.nombre = nombreUsuario;
        this.apellido = apellidoUsuario;
        this.localidad = localidadUsuario;
        this.email = emailUsuario;
        this.telefono = telefonoUsuario;
        this.tipo = tipoUsuario;
    }
    agregarInmueble() {

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
        this.monto = montoAlq;
        this.expensas = montoExp;
        this.img1 = img1;

    }
}

//instacio algunos objetos
let Publicador1 = new Usuario('Lorenzon', 'Inmobiliaria','Parana', 'email@email.com', '123456', 'Publicador');
let Publicador2 = new Usuario('Jose Perez', 'Particular','Parana', 'email@email.com', '123456', 'Publicador');
let Publicador3 = new Usuario('Caramagna', 'Inmobiliaria','Parana', 'email@email.com', '123456', 'Publicador');
let Publicador4 = new Usuario('Alicia Reyes', 'Particular','Parana', 'email@email.com', '123456', 'Publicador');

//instancio algunos objetos inmueble, luego los agrego a un array de objetos
let Departamento1 = new Inmueble(01, 'Casa', 'Parana', 'Vivienda', 2, 1, false, 22000, 4000, 'media/img/inmuebles/casa1t.jpg');
let Departamento2 = new Inmueble(02, 'Departamento', 'Rosario', 'Vivienda', 3, 1, true, 33000, 7000, 'media/img/inmuebles/depto1t.jpg');
let Departamento3 = new Inmueble(03, 'Departamento', 'Parana', 'Vivienda', 1, 1, false, 18000, 3000, 'media/img/inmuebles/depto2t.jpg');
let Departamento4 = new Inmueble(04, 'Local', 'Cerrito', 'Comercial', 2, 1, false, 12000, 0, 'media/img/inmuebles/local1t.jpg');
let Departamento5 = new Inmueble(05, 'Departamento', 'Villa Urquiza', 'Vivienda', 2, 1, false, 12000, 0, 'media/img/inmuebles/depto3t.jpg');
const arrayDeptos = [Departamento1, Departamento2, Departamento3, Departamento4, Departamento5];
//console.log(arrayDeptos);

//const pp = JSON.stringify(arrayDeptos);
//console.log(pp);

/*cargo un json con mas deptos publicados*/
function leerJSon(archivo, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", archivo, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


leerJSon("base.json", function(text){
    var arrayDeptos2 = JSON.parse(text);
    
    for (let i = 0; i < arrayDeptos2.length; i++){
        let desdeJson = new Inmueble(arrayDeptos2[i].id, arrayDeptos2[i].tipo, arrayDeptos2[i].localidad, arrayDeptos2[i].uso, arrayDeptos2[i].habitaciones, arrayDeptos2[i].banios, arrayDeptos2[i].cochera, arrayDeptos2[i].monto, arrayDeptos2[i].expensas, arrayDeptos2 [i].img1);
        arrayDeptos.push(desdeJson);
    }
    //console.log(arrayDeptos);
    cargoDeptos();    
});

//Eventos en formularios
const formInicio = document.getElementById("formularioInicio");
const formPublicador= document.getElementById("formPublicar");
const formBuscador = document.getElementById("formBuscar");
//Eventos en botones para volver a form inicio
const botonVolverDeBusqueda = document.getElementById("volver");
const botonVolverDePublicar = document.getElementById("volver1");

formInicio.addEventListener('submit', validarForm);
formPublicador.addEventListener('submit', validarFormPubli);
formBuscador.addEventListener('submit', validarFormBusca);
botonVolverDeBusqueda.addEventListener('click', funcionVolverDeBusqueda);
botonVolverDePublicar.addEventListener('click', funcionVolverDePublicar);


function funcionVolverDeBusqueda(){
    formBuscador.classList.add("ocultar");
    formInicio.classList.remove("ocultar");
    let resultBusq = document.getElementById("busqueda");    
    resultBusq.innerHTML = ` `;
    var titulo = document.getElementById("tituloBusqueda");    
    titulo.classList.add("ocultar");
}

function funcionVolverDePublicar(){
    formPublicador.classList.add("ocultar");
    formInicio.classList.remove("ocultar");
}


function validarForm(e){    
    e.preventDefault();
    //tomo los datos ingresados en el formulario
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let localidad = document.getElementById("localidad").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let radioTipo = document.getElementById("publica").checked;
    let tipo ='';
    //Me fijo si es usuario publicador o buscador de inmuebles
    if (radioTipo){
        tipo = 'Publicador';
    }else{
        tipo = 'Buscador';
    }

    if(nombre ==='' || apellido === '' || localidad === '' ||  email === '' || telefono === ''){
        mostrarError('Todos los campos son obligatorios');
        return;
    }
    //con los datos ingresados, instancio el objeto Usuario
    var Usuario1 = new Usuario(nombre, apellido, localidad, email, telefono, tipo);
    //formulario correcto
    mostrarMensaje("Datos ingresados correctamente", Usuario1);

    // modifico el html con el nombre de usuario en la navbar
    let user = document.getElementById("user");
    console.log(user.textContent);
    user.textContent = nombre;

}

function mostrarError(mensaje){
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('error');
    console.log(error);
    formInicio.appendChild(error);

    //mensaje dura 3 seg
    setTimeout(() => {
        error.remove();
    }, 3000);     
}
function mostrarErrorPubli(mensaje){
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('error');
    console.log(error);    
    formPublicador.appendChild(error);
    
    //mensaje dura 3 seg
    setTimeout(() => {
        error.remove();
    }, 3000);     
}

function mostrarErrorBusqueda(mensaje){
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('error');
    console.log(error);    
    formBuscador.appendChild(error);
    
    //mensaje dura 3 seg
    setTimeout(() => {
        error.remove();
    }, 3000);     
}

function mostrarMensaje(mensaje, usuario){
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');    
    formInicio.appendChild(alerta);
    //mensaje dura 5 seg
    setTimeout(() => {
        alerta.remove();
        //formInicio.remove();
        formInicio.classList.add("ocultar");        
        if(usuario.tipo === "Publicador"){
            formPublicador.classList.remove("ocultar"); 
        }
        if (usuario.tipo === "Buscador"){
            console.log("mostrando form busqueda");
            formBuscador.classList.remove("ocultar");
        }
        
    }, 2000);     
}

/*FORMULARIO PARA PUBLICAR*/
function validarFormPubli(e){
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
    if(tipoInmueble ==='' || localidad === '' || tipoUsos === '' ||  habs === '' || banios === '' || cochera === '' || alq === '' || exp === ''){
        mostrarErrorPubli('Todos los campos son obligatorios');
        return;
    }
    //Instancio el objeto con los datos ingresados
    let nuevoInmueble = new Inmueble(tipoInmueble, localidad, tipoUsos, habs, banios, cochera, alq, exp);
    //lo ingreso al array de inmueble
    arrayDeptos.push(nuevoInmueble);    
    mostrarMensajePubli("El inmueble se publicó correctamente", nuevoInmueble);
    //genero las tarjetas con todos los deptos actualizados, incluso el recien ingresado
    cargoDeptos();
}


function mostrarMensajePubli(mensaje, inmueble){
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    console.log(alerta);
    formPublicador.appendChild(alerta);
    formBuscador.appendChild(alerta);
    console.log("publicado", inmueble);
    //mensaje dura 5 seg
    setTimeout(() => {
        alerta.remove();
        formPublicador.remove();               
    }, 1000);  
    let tarjetaPubli = document.getElementById("inmueblePublicado");
    tarjetaPubli.classList.remove("ocultar");
    let tarjeta = document.getElementById("publicacion");
    console.log("contenido tarjeta",tarjeta);
    let publicacion = document.createElement("div"); 
    publicacion.classList.add('tarjetaDepto');
    publicacion.innerHTML = `<h3 class='parrafoTarj'> Tipo: ${inmueble.tipo}</h3>
                                    <p class='parrafoTarj'>  Localidad: ${inmueble.localidad}</p>
                                    <b class='parrafoTarj'> $ ${inmueble.monto}</b>`; 
    tarjeta.appendChild(publicacion); 
}

/*FORMULARIO PARA BUSCAR*/
function validarFormBusca(e){
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

    if(tipoInmueble ==='' || localidad === '' || tipoUsos === '' ||  habs === '' || banios === '' || cochera === '' || alq === '' || exp === ''){
        mostrarErrorBusqueda('Todos los campos son obligatorios');
        return;
    }
    let busqueda = new Inmueble(tipoInmueble, localidad, tipoUsos, habs, banios, cochera, alq, exp);
    console.log(busqueda);
    mostrarMensajePubli("buscando Coincidencias");
    muestroDeptos(arrayDeptos, localidad, tipoInmueble);


}

/*--------------------------------------------------------------------------*/
function cargoDeptos(){
    let muestras = document.getElementById("contenedorMuestras");
    for (const inmueble of arrayDeptos) {
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
            let identificador = "btnVer"+ inmueble.id;
            //console.log(identificador);

            //obtengo el elemento(un boton) por si id
            let detalles = document.getElementById(identificador);
            //console.log("detalles", detalles);
            //lo dejo a la escucha de un click y que ejecute la funcion mostrarDetalles
            detalles.addEventListener('click', mostrarDetalles);          
        }
    }
/*----------------------------Resultados Busqueda------------------------------------*/
function muestroDeptos(objeto, localidad, tipoInmueble){
    var titulo = document.getElementById("tituloBusqueda");    
    titulo.classList.remove("ocultar");
    //array con todos los q sean de localidad parana
    let resultadoBusqueda = [];
    const filtroBusqueda = objeto.filter(busqueda => busqueda.localidad == localidad && busqueda.tipo === tipoInmueble);
    resultadoBusqueda = filtroBusqueda; 
    //busqueda es el id de <section> dentro del cual quiero insertar las tarjetas  
    let resultBusq = document.getElementById("busqueda");    
    resultBusq.innerHTML = ` `;

    for(elemento of resultadoBusqueda){     
        let contenedor = document.createElement("div"); 
        contenedor.classList.add('tarjetaDeptoBusqueda');          
        contenedor.innerHTML = `<h3> Tipo: ${elemento.tipo}</h3>
                                <p>  Localidad: ${elemento.localidad}</p>
                                <b> $ ${elemento.monto}</b>`;
        resultBusq.appendChild(contenedor);
    }
    
}

function mostrarDetalles(e){  
    //guardo el id del boton
    let id= e.target.id; 
    //expresion regular
    var regex = /(\d+)/g;
    //al id le dejo solo los nros con la regex
    let nro = parseInt(id.match(regex));
    //mis id de inmueble arrancan en 1, por eso el -1
    let propiedad = arrayDeptos[nro-1]; 
    //paso el nooleano a Si o No para mostrarlo
    let cochera = propiedad['cochera'];    
    if (cochera){
        estacionamiento = 'Si';
    }else{
        estacionamiento = 'No';
    }
    //creo el div para mostrar en la tarjeta
    let tarjetaDetalle = document.createElement("DIV");
    //tarjetaDetalle.classList.add('tarjetaDeptoBusqueda');
    tarjetaDetalle.classList.add('overlay');

    //Contenido de la tarjeta 
    tarjetaDetalle.innerHTML = `<div><p class="parrafoDetalle">${propiedad.localidad}</p>
    <h3>Tipo:${propiedad.tipo}</h3>  
    <p class="parrafoDetalle">Tipo de Uso: ${propiedad.uso}</p>    
    <p class="parrafoDetalle">Cantidad de habitaciones: ${propiedad.habitaciones}</p>
    <p class="parrafoDetalle">Cantidad de baños: ${propiedad.banios}</p>
    <p class="parrafoDetalle">Cochera: ${estacionamiento}</p>    
    <p class="parrafoDetalle">Alquiler Mesual: $ ${propiedad.monto}</p>
    <p class="parrafoDetalle">Expensas Aprox: $ ${propiedad.expensas}</p></div>
    <img class="imgDetalle" src=${propiedad.img1}>`;
    //Lo tiro al body
    const body = document.querySelector("body");
    body.appendChild(tarjetaDetalle);

    //btn para cerrar
    const cerrarTarjeta = document.createElement("P");
    cerrarTarjeta.textContent = 'X';
    cerrarTarjeta.classList.add('btnCerrar');
    tarjetaDetalle.appendChild(cerrarTarjeta);

    //para cerrar la tarjeta
    cerrarTarjeta.addEventListener('click', function(){
        tarjetaDetalle.remove();
    });

}

