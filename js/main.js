/* Proyecto final JavaScript
   Buscador de ALquileres "El Hornerito" */
//Creo las clases USUARIO e INMUEBLE
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
    constructor(tipoInmueble, localidadInmueble, tipoUso, cantHab, cantBanio, cochera, montoAlq, montoExp) {
        this.tipo = tipoInmueble;
        this.localidad = localidadInmueble;
        this.uso = tipoUso;
        this.habitaciones = cantHab;
        this.banios = cantBanio;
        this.cochera = cochera;
        this.monto = montoAlq;
        this.expensas = montoExp;
    }
}

//instacio algunos objetos
let Publicador1 = new Usuario('Lorenzon', 'Inmobiliaria','Parana', 'email@email.com', '123456', 'Publicador');
let Publicador2 = new Usuario('Jose Perez', 'Particular','Parana', 'email@email.com', '123456', 'Publicador');
let Publicador3 = new Usuario('Caramagna', 'Inmobiliaria','Parana', 'email@email.com', '123456', 'Publicador');
let Publicador4 = new Usuario('Alicia Reyes', 'Particular','Parana', 'email@email.com', '123456', 'Publicador');

//instancio algunos objetos inmueble, luego los agrego a un array de objetos
let Departamento1 = new Inmueble('Casa', 'Parana', 'Vivienda', 2, 1, false, 22000, 4000);
let Departamento2 = new Inmueble('Departamento', 'Rosario', 'Vivienda', 3, 1, true, 33000, 7000);
let Departamento3 = new Inmueble('Departamento', 'Parana', 'Vivienda', 1, 1, false, 18000, 3000);
let Departamento4 = new Inmueble('Local', 'Cerrito', 'Comercial', 2, 1, false, 12000, 0);
let Departamento5 = new Inmueble('Departamento', 'Villa Urquiza', 'Vivienda', 2, 1, false, 12000, 0);
const arrayDeptos = [Departamento1, Departamento2, Departamento3, Departamento4, Departamento5];
console.log(arrayDeptos);

const pp = JSON.stringify(arrayDeptos);
console.log(pp);

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
        let desdeJson = new Inmueble(arrayDeptos2[i].tipo, arrayDeptos2[i].localidad, arrayDeptos2[i].uso, arrayDeptos2[i].habitaciones, arrayDeptos2[i].banios, arrayDeptos2[i].cochera, arrayDeptos2[i].monto, arrayDeptos2[i].expensas);
        arrayDeptos.push(desdeJson);
    }
    console.log(arrayDeptos);
    cargoDeptos();    
});

//Evento submit en el formulario
const formulario1 = document.getElementById("formulario2");
const formulario2 = document.getElementById("formPublicar");
const formulario3 = document.getElementById("formBuscar");

console.log(formulario2);
console.log(formulario3);
formulario1.addEventListener('submit', validarForm);
formulario2.addEventListener('submit', validarFormPubli);
formulario3.addEventListener('submit', validarFormBusca);



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
    formulario1.appendChild(error);

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
    formulario2.appendChild(error);
    
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
    formulario3.appendChild(error);
    
    //mensaje dura 3 seg
    setTimeout(() => {
        error.remove();
    }, 3000);     
}

function mostrarMensaje(mensaje, usuario){
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    console.log(alerta);
    formulario1.appendChild(alerta);
    //mensaje dura 5 seg
    setTimeout(() => {
        alerta.remove();
        formulario1.remove();
        console.log(usuario.tipo);
        if(usuario.tipo === "Publicador"){
            formulario2.classList.add("formPubli"); 
        }
        if (usuario.tipo === "Buscador"){
            console.log("cargando form buscador...");
            formulario3.classList.add("formBusco");
        }
        
    }, 2000);     
}


function borroForm(usuario){
    usuario = usuario;
    console.log(usuario.tipo)
    if (usuario.tipo === "Publicador"){
        formulario1.remove();
    }
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
    console.log(arrayDeptos);
    mostrarMensajePubli("El inmueble se publicó correctamente");
    //genero las tarjetas con todos los deptos actualizados, incluso el recien ingresado
    cargoDeptos();
}


function mostrarMensajePubli(mensaje){
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    console.log(alerta);
    formulario2.appendChild(alerta);
    formulario3.appendChild(alerta);
    //mensaje dura 5 seg
    setTimeout(() => {
        alerta.remove();
        formulario2.remove();
        //console.log(usuario.tipo);

        
    }, 2000);     
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
    for (const inmueble of arrayDeptos) {
            let contenedor = document.createElement("div");
            contenedor.classList.add('tarjetaDepto');
            //Definimos el innerHTML del elemento con una plantilla de texto
            contenedor.innerHTML = `<h3 class='parrafoTarj'> Tipo: ${inmueble.tipo}</h3>
                                    <p class='parrafoTarj'>  Localidad: ${inmueble.localidad}</p>
                                    <b class='parrafoTarj'> $ ${inmueble.monto}</b>`;
            document.body.appendChild(contenedor);
        }
}

function muestroDeptos(objeto, localidad, tipoInmueble){
    //array con todos los q sean de localidad parana
    const resultadoBusqueda = objeto.filter(busqueda => busqueda.localidad == localidad && busqueda.tipo === tipoInmueble);
    //para ver en consola si esta filtrando bien
    console.log(resultadoBusqueda);  
    //busqueda es el id de <section> dentro del cual quiero insertar las tarjetas  
    let resultBusq = document.getElementById("busqueda");
    
    for(elemento of resultadoBusqueda){     
        let contenedor = document.createElement("div"); 
        contenedor.classList.add('tarjetaDeptoBusqueda');          
        contenedor.innerHTML = `<h3> Tipo: ${elemento.tipo}</h3>
                                <p>  Localidad: ${elemento.localidad}</p>
                                <b> $ ${elemento.monto}</b>`;
        resultBusq.appendChild(contenedor);
    }
}

function refrescarBusqueda(){
    
}
