window.addEventListener('load', inicio);

function inicio() {
    document.querySelector("#btnAlquilar").addEventListener("click", alquilarMaquina);
    document.querySelector("#btnInicioSesion").addEventListener("click", hacerLogin);
    document.querySelector("#btnSeccionSalir").addEventListener("click", salir);
    document.querySelector("#btnRegistroUsuario").addEventListener("click", registrarUsuario);
    document.querySelector('#buttonFiltrar').addEventListener('click', filtrarMaquinasEstado)

    let botones = document.querySelectorAll(".btnSeccion");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click",mostrarSeccion);  
    }
    ocultarSecciones();
    document.querySelector("#btnSeccionIngresar").click();
    sistema.mostrarBotones("user")
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector("#seccionRegistrarse").style.display = "block"
  }
  
// Variables globales  
let sistema = new Sistema()
let usuarioLogueado = null;
let idUsuario = 6;
let idAlquiler = 11;

// Funciones de Navegación
function mostrarSeccion(){
        ocultarSecciones();
        let idBtn = this.getAttribute("id");
        let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
        document.querySelector("#" + idSeccion).style.display = "block";
        document.querySelector('#pSeccionAlquilar').innerHTML = "";
}

function ocultarSecciones(){
    let secciones = document.querySelectorAll(".seccion")
    for (let i = 0; i < secciones.length; i++) {
        secciones[i].style.display = "none";
    }
}

function ocultarBotones(){
    let botonesOcultar = document.querySelectorAll(".btnSeccion");
    for (let i = 0; i < botonesOcultar.length; i++) {
        botonesOcultar[i].style.display = "none";
    }
}

//Funciones de registro y acceso

function registrarUsuario(){
  let nombre = document.querySelector("#txtNombreRegistro").value;
  let apellido = document.querySelector("#txtApellidoRegistro").value;
  let nombreUsuarioIngresado = document.querySelector('#txtUsuarioRegistro').value;
  let nombreUsuario = nombreUsuarioIngresado.toLowerCase();
  let clave = document.querySelector("#txtContraseniaRegistro").value;
  let tarjetaIngresada = document.querySelector("#txtTarjetaRegistro").value;
  let tarjeta = sistema.validarTarjetaIngresada(tarjetaIngresada)
  let cvc = document.querySelector("#txtCVregistro").value;
  let nombreOk = sistema.validarNombre(nombreUsuario);

  let mensaje = "";

  let camposCompletos = sistema.validarCamposVaciosRegistro(nombre,apellido,nombreUsuario,clave,cvc);
  let formatoPassValido = sistema.verificarFormatoPass(clave);
  let existeUsuario = sistema.buscarElemento(sistema.usuariosUser,"nombreUsuario",nombreUsuario);
  let existeUsuarioAdm = sistema.buscarElemento(sistema.usuariosAdministrador,"nombreUsuario",nombreUsuario);
  let tarjetaCreditoValida = sistema.algoritmoLuhn(tarjeta);
  if(camposCompletos === true){
    if(formatoPassValido === true){
      if(nombreOk === true){
        if(existeUsuario === false){
          if (existeUsuarioAdm === false){
            if(tarjetaCreditoValida === true && tarjetaCreditoValida !== "" ){
              if(sistema.validarCvc(cvc)){
                let usuario = new UsuariosUser(idUsuario,nombre,apellido,nombreUsuario,clave,tarjeta,cvc, 'pendiente');
                idUsuario++;
              sistema.agregarUsuario(usuario);
              mensaje = "Usuario registrado con aprobación pendiente";
              document.querySelector("#txtNombreRegistro").value = ""
              document.querySelector("#txtApellidoRegistro").value = ""
              document.querySelector('#txtUsuarioRegistro').value = ""
              document.querySelector("#txtContraseniaRegistro").value = ""
              document.querySelector("#txtTarjetaRegistro").value = ""
              document.querySelector("#txtCVregistro").value = "";
            } else {
              mensaje = "CVC incorrecto"
            }
          } else {
            mensaje = `La tarjeta ingresada no es válida. <br> El formato debe ser xxxx-xxxx-xxxx-xxxx`
          }
        } else {
          mensaje = "El nombre de usuario ya está registrado"
        }
        } else {
        mensaje = "El nombre de usuario ya está registrado"
      }
      } else{
      mensaje = "Nombre de usuario incorrecto"
    }  
    } else {
      mensaje = `La contraseña no es válida: <br> 
      -Debe tener un minimo de 5 caracteres <br>  
      -Debe tener mínimo una mayúscula, una minúscula y un número`
    }
  } else {
    mensaje = "Todos los campos son obligatorios"
  } 
  document.querySelector("#pResultadoRegistrar").innerHTML = mensaje;
}


function hacerLogin(){
    let mensaje = "";
    let nombreIngresado = document.querySelector("#txtUsuarioIngresar").value;
    let nombre = nombreIngresado.toLowerCase();
    let clave = document.querySelector("#txtContraseniaIngresar").value;
    let tipoUsuario = document.querySelector("#slcSeccionIngresar").value;
    
  if (tipoUsuario === "usuario"){
    let loginUsuario = sistema.verificarLogin(nombre,clave, sistema.usuariosUser);
    let objUsuario = sistema.obtenerObjeto(sistema.usuariosUser, 'nombreUsuario', nombre)
    if (loginUsuario === true ){
      let estadoUsuario = objUsuario.estado;
      if (estadoUsuario === "activo" ){
        document.querySelector("#txtUsuarioIngresar").value = "";
        document.querySelector("#txtContraseniaIngresar").value = "";
        mostrarMenuOcultandoLoginYRegistroUSER();
        
        document.querySelector("#pResultadoRegistrar").value = "";
      } else {
        mensaje = `El usuario está ${estadoUsuario}`
      }
    } else {
      mensaje = "Usuario y/o contraseña incorrectos o el tipo de usuario seleccionado es incorrecto"
    }
  } else if (tipoUsuario === 'administrador') {
    let loginAdministrador = sistema.verificarLogin(nombre,clave, sistema.usuariosAdministrador);
    if(loginAdministrador){
      document.querySelector("#txtUsuarioIngresar").value = "";
      document.querySelector("#txtContraseniaIngresar").value = "";
      mostrarMenuOcultandoLoginYRegistroADM();
      document.querySelector("#pResultadoRegistrar").value = "";
      listarUsuarios();
      selectMaquinasStock();
      mostrarInformeMaquinas();
    } else {
      mensaje = "Usuario y/o contraseña incorrectos o el tipo de usuario seleccionado es incorrecto"
      }
  } else if (tipoUsuario === ""){
    mensaje = "Seleccione tipo de usuario"
  }
  document.querySelector("#pResultadoIngresar").innerHTML = mensaje;      
}

//Función Menú Administrador
function mostrarMenuOcultandoLoginYRegistroADM(){
  document.querySelector("#pResultadoIngresar").innerHTML = "";
    document.querySelector("#pResultadoRegistrar").innerHTML = "";
  document.querySelector("#navPrincipal").style.display = "block";
  
  document.querySelector("#nombreUsuarioLogueado").style.display = "block";
  document.querySelector("#nombreUsuarioLogueado").innerHTML = "Bienvenido/a " + usuarioLogueado.nombreUsuario;

  document.querySelector("#seccionIngresar").style.display = "none"
  document.querySelector("#seccionRegistrarse").style.display = "none"
  
   sistema.mostrarBotones("admin")
}

//Función Menú Usuario
function mostrarMenuOcultandoLoginYRegistroUSER (){
    selectAlquiler();
    listarMaquinasAlquiladas();
    mostrarCostoTotalUsuarios();
    document.querySelector("#pResultadoIngresar").innerHTML = "";
    document.querySelector("#pResultadoRegistrar").innerHTML = "";
    document.querySelector("#navPrincipal").style.display = "block";
    
    document.querySelector("#nombreUsuarioLogueado").style.display = "block";
    document.querySelector("#nombreUsuarioLogueado").innerHTML = "Bienvenido/a " + usuarioLogueado.nombreUsuario;

    document.querySelector("#seccionIngresar").style.display = "none"
    document.querySelector("#seccionRegistrarse").style.display = "none"

    sistema.mostrarBotones("user")
}

//Función para salir de la app.
function salir(){
    document.querySelector("#tblCostoTotal").innerHTML = '';
    document.querySelector("#pCostoTotal").innerHTML = "";
    document.querySelector("#tblListadoMaquinasAlquiladas").innerHTML = "";
    ocultarSecciones();
    ocultarBotones();
   
    document.querySelector("#seccionIngresar").style.display = "block";
    document.querySelector("#seccionRegistrarse").style.display = "block";
    usuarioLogueado = null;
    document.querySelector("#navPrincipal").style.display = "none";
    document.querySelector("#nombreUsuarioLogueado").style.display = "none"
}

//Funcion para cargar el combo desplegable del alquiler de máquinas.
 function selectAlquiler() {
  document.querySelector("#slcTipoInstancia").innerHTML = ""
  for (let i = 0; i < sistema.maquina.length; i++) {
    const maquina = sistema.maquina[i];
    document.querySelector("#slcTipoInstancia").innerHTML += `<option value="${maquina.idMaquina}">
    ${maquina.tipoMaquina} - Costo U$S ${maquina.costoAlquiler} - Stock: ${maquina.stock - maquina.stockAlquiladas}</option>`
  }
} 

//Funcion para alquilar máquinas.
function alquilarMaquina(){
  document.querySelector('#pSeccionAlquilar').innerHTML = "";
  let nombreMaquinaAlquilada = '';
  let idMaquina = Number(document.querySelector("#slcTipoInstancia").value); 

  for (let i = 0; i < sistema.maquina.length; i++) {
    const maquina = sistema.maquina[i];
    if(maquina.idMaquina === idMaquina){
      nombreMaquinaAlquilada = maquina.tipoMaquina;
    }
  }

  if (sistema.stockSuficiente(sistema.maquina, 'idMaquina', idMaquina)){
    let maquina = new MaquinaAlquiler(idAlquiler, idMaquina, usuarioLogueado.idUsuario, 'Encendida', 0, nombreMaquinaAlquilada);
   
    sistema.agregarMaquinaAlquilada(maquina);
    idAlquiler++;
    document.querySelector('#pSeccionAlquilar').innerHTML = "Computadora alquilada con éxito";
    selectAlquiler();
    listarMaquinasAlquiladas();
    mostrarCostoTotalUsuarios();
    
  } else {
    document.querySelector('#pSeccionAlquilar').innerHTML = "No hay stock suficiente";
  }
}

//Función para mostrar maquinas alquiladas por el usuario.
function listarMaquinasAlquiladas() {
  document.querySelector("#tblListadoMaquinasAlquiladas").innerHTML = "";
  for (let i = 0; i < sistema.maquinaAlquiler.length; i++) {
    let maquinaAlquilada = sistema.maquinaAlquiler[i];
    
    if(maquinaAlquilada.idUsuario === usuarioLogueado.idUsuario){
      document.querySelector("#tblListadoMaquinasAlquiladas").innerHTML += `<tr>
      <td>${maquinaAlquilada.nombreMaquina}</td>
      <td>${maquinaAlquilada.estadoMaquina}</td>
      <td>${maquinaAlquilada.encendido}</td>
      <td> <select id='EstadoMaquinasAlquiladas${maquinaAlquilada.alquiler}'> <option value='encender'>Encender</option> <option value = "apagar">Apagar</option> </select> </td>
      <td><input type="button" value="Modificar" class="botonesEncenderApagar" data-maquina="${maquinaAlquilada.alquiler}"></td>
      </tr>`
    }
  }

   let btnsEncenderApagar = document.querySelectorAll(".botonesEncenderApagar");
  for (let i = 0; i < btnsEncenderApagar.length; i++) {
    btnsEncenderApagar[i].addEventListener("click", encenderApagarMaquina);    
  } 
}

//Función para encender/apagar maquinas alquiladas por el usuario.
function encenderApagarMaquina() {

  let idMaquinaApagarEncender = Number(this.getAttribute("data-maquina"));
  let listaMaquinasAlquiladas = document.querySelector('#EstadoMaquinasAlquiladas' + idMaquinaApagarEncender).value;
  let objMaquina = sistema.obtenerObjeto(sistema.maquinaAlquiler, "alquiler", idMaquinaApagarEncender);
  let estadoMaq = document.querySelector("#slcMaquinasAlquiladasUsuario").value;
  
  for(let i = 0; i < sistema.maquinaAlquiler.length; i++){
    
    if(sistema.maquinaAlquiler[i].alquiler === idMaquinaApagarEncender ){
      if (objMaquina.estadoMaquina === "Apagada" && listaMaquinasAlquiladas === 'encender'){
          objMaquina.estadoMaquina = 'Encendida'; 
          objMaquina.encendido += 1;
          sistema.encendidoApagadoMaquina(sistema.maquinaAlquiler[i].idMaquina);
          mostrarCostoTotalUsuarios();
          filtrarMaqEncendidoApagado(estadoMaq);
        } else if (objMaquina.estadoMaquina === "Encendida" && listaMaquinasAlquiladas === 'apagar'){
          objMaquina.estadoMaquina = 'Apagada';
          filtrarMaqEncendidoApagado(estadoMaq);
        } 
      }     
      document.querySelector('#EstadoMaquinasAlquiladas' + idMaquinaApagarEncender).value = '';
      listarMaquinasAlquiladas();
    }
} 

//Funciones para filtrar las máquinas por estado (todas/encendidas/apagadas)
function filtrarMaquinasEstado(){
  let estadoMaquinasFiltro = document.querySelector("#slcMaquinasAlquiladasUsuario").value;
  document.querySelector("#tblListadoMaquinasAlquiladas").innerHTML = "";

  for (let i = 0; i < sistema.maquinaAlquiler.length; i++) {
    let maquinaAlquilada = sistema.maquinaAlquiler[i];
    
    if(maquinaAlquilada.idUsuario === usuarioLogueado.idUsuario){
      if(estadoMaquinasFiltro === ''){
        listarMaquinasAlquiladas(); 
        } else {
        filtrarMaqEncendidoApagado(estadoMaquinasFiltro);
        }
      }

    let btnsEncenderApagar = document.querySelectorAll(".botonesEncenderApagar");
    for (let i = 0; i < btnsEncenderApagar.length; i++) {
      btnsEncenderApagar[i].addEventListener("click", encenderApagarMaquina);    
    } 
  }
}

//Funcion que recibe parámetro (estado de la máquina) y que carga dinámicamente las máquinas según el mismo. 
function filtrarMaqEncendidoApagado(estadoMaq){
  document.querySelector("#tblListadoMaquinasAlquiladas").innerHTML = "";

  for (let i = 0; i < sistema.maquinaAlquiler.length; i++) {
    let maquinaAlquilada = sistema.maquinaAlquiler[i];
    
    if(maquinaAlquilada.idUsuario === usuarioLogueado.idUsuario){
      if (estadoMaq === ""){
        listarMaquinasAlquiladas();
      } else if (estadoMaq === maquinaAlquilada.estadoMaquina){
        document.querySelector("#tblListadoMaquinasAlquiladas").innerHTML += `<tr>
      <td>${maquinaAlquilada.nombreMaquina}</td>
      <td>${maquinaAlquilada.estadoMaquina}</td>
      <td>${maquinaAlquilada.encendido}</td>
      <td> <select id='EstadoMaquinasAlquiladas${maquinaAlquilada.alquiler}'> <option value='encender'>Encender</option> <option value = "apagar">Apagar</option> </select> </td>
      <td><input type="button" value="Modificar" class="botonesEncenderApagar" data-maquina="${maquinaAlquilada.alquiler}"></td>
      </tr>`
      }
    }
  }

  let btnsEncenderApagar = document.querySelectorAll(".botonesEncenderApagar");
  for (let i = 0; i < btnsEncenderApagar.length; i++) {
    btnsEncenderApagar[i].addEventListener("click", encenderApagarMaquina);    
  } 
}

//Función para mostrar costos del usuario
function mostrarCostoTotalUsuarios(){

document.querySelector("#tblCostoTotal").innerHTML = '';
document.querySelector("#pCostoTotal").innerHTML = "";
let sumaTotal = 0;

for(let i = 0; i < sistema.maquinaAlquiler.length;i++){
  let maquinaAlquilada = sistema.maquinaAlquiler[i];

  let maquina = sistema.obtenerObjeto(sistema.maquina, "idMaquina", maquinaAlquilada.idMaquina)

  if(maquinaAlquilada.idUsuario === usuarioLogueado.idUsuario){
    document.querySelector("#tblCostoTotal").innerHTML += `<tr>
    <td>${maquinaAlquilada.nombreMaquina}</td>
    <td>${maquina.costoEncendido}</td>
    <td>${maquinaAlquilada.encendido}</td>
    <td>${maquina.costoAlquiler + (maquinaAlquilada.encendido * maquina.costoEncendido)}</td>
    </tr>`
    sumaTotal = sumaTotal + (maquina.costoAlquiler + (maquinaAlquilada.encendido * maquina.costoEncendido))
    document.querySelector("#pCostoTotal").innerHTML = `La suma total de los alquileres es U$S ${sumaTotal}`
  }
} 
}

//Función que carga dinámicamente la lista de usuarios (ADM)
function listarUsuarios() {
  document.querySelector("#tblListaUsuarios").innerHTML = "";
  for (let i = 0; i < sistema.usuariosUser.length; i++) {
    let usuario = sistema.usuariosUser[i];
    
    
    document.querySelector("#tblListaUsuarios").innerHTML += `<tr>
    <td>${usuario.nombre}</td>
    <td>${usuario.apellido}</td>
    <td>${usuario.nombreUsuario}</td>
    <td>${usuario.estado}</td>
    <td> <select id='slcListaUsuarios${usuario.idUsuario}'> <option value='activar'>Activar</option> <option value = "bloquear">Bloquear</option></select></td>
    <td><input type="button" value="Modificar" class="botonesActivarBloquear" data-usuarios="${usuario.idUsuario}"></td>
    </tr>`
  
  }

   let btnsActivarBloquear = document.querySelectorAll(".botonesActivarBloquear");
  for (let i = 0; i < btnsActivarBloquear.length; i++) {
    btnsActivarBloquear[i].addEventListener("click", activarBloquearUsuarios);    
  } 
  
}

//Función para activar y bloquear usuarios (ADM)
function activarBloquearUsuarios(){
  let idModificarUsuario = Number(this.getAttribute("data-usuarios"));
  let listaUsuarios = document.querySelector('#slcListaUsuarios' + idModificarUsuario).value;
  let objUsuario= sistema.obtenerObjeto(sistema.usuariosUser, "idUsuario", idModificarUsuario);
  
  for(let i = 0; i < sistema.usuariosUser.length; i++){
    if(idModificarUsuario === sistema.usuariosUser[i].idUsuario){
      if (listaUsuarios === "activar" && objUsuario.estado === "bloqueado"){
        objUsuario.estado = 'activo'; 
        } else if (listaUsuarios === "bloquear" && objUsuario.estado === "activo"){
          objUsuario.estado = 'bloqueado';
          sistema.devolverStock(sistema.usuariosUser[i].idUsuario)
          sistema.devolverMaquinas(sistema.usuariosUser[i].idUsuario);
          selectMaquinasStock();
          mostrarInformeMaquinas();
        }else if (listaUsuarios === "bloquear" && objUsuario.estado === "pendiente"){
         objUsuario.estado = "pendiente";
        } else if (listaUsuarios === "activar" && objUsuario.estado === "pendiente"){
          objUsuario.estado = "activo";
        }
      document.querySelector('#slcListaUsuarios' + idModificarUsuario).value = '';
    }
  }
  listarUsuarios();
}

//Función que carga dinámicamente las máquinas disponibles para su alquiler (ADM)
function selectMaquinasStock() {
  document.querySelector("#tblTipoInstanciaStock").innerHTML = ""
  for (let i = 0; i < sistema.maquina.length; i++) {
    const maquina = sistema.maquina[i];
    document.querySelector("#tblTipoInstanciaStock").innerHTML += `<tr>
      <td>${maquina.idMaquina}</td>
      <td>${maquina.tipoMaquina}</td>
      <td>${maquina.stockAlquiladas}</td>
      <td>${maquina.stock}</td>
      <td><input type="text" id= "txtModificarStock${maquina.idMaquina}" </td>
      <td><input type="button" value="Modificar" class="botonesModificarStock" data-stock="${maquina.idMaquina}"></td>
      </tr>`
  }

  let btnsModificarStock = document.querySelectorAll(".botonesModificarStock");
  for (let i = 0; i < btnsModificarStock.length; i++) {
    btnsModificarStock[i].addEventListener("click", modificarMaquinasStock);    
  } 
} 

//Funcionalidad para cada botón 
function modificarMaquinasStock(){
  
  let idMaquina = Number(this.getAttribute("data-stock"));
  let stockNuevo = Number(document.querySelector('#txtModificarStock' + idMaquina).value);
  for(let i = 0; i < sistema.maquina.length;i++){

    if(stockNuevo >= sistema.maquina[i].stockAlquiladas && idMaquina === sistema.maquina[i].idMaquina){
      
      sistema.maquina[i].stock = stockNuevo;
      selectMaquinasStock();
    }
  }
}

//Función que muestra todas las máquinas alquiladas y su información. (ADM)
function mostrarInformeMaquinas(){

  document.querySelector("#tblInformeMaquinas").innerHTML = '';
  document.querySelector("#pInresosMaquinasVirtualesAdm").innerHTML = "";
  let sumaTotal = 0;

for(let i = 0; i < sistema.maquina.length;i++){
  let maquina = sistema.maquina[i];
  
  if(maquina.stockAlquiladas > 0){
    
    document.querySelector("#tblInformeMaquinas").innerHTML += `<tr>
    <td>${maquina.tipoMaquina}</td>
    <td>${maquina.stockAlquiladas}</td>
    <td>${maquina.encendidoApagado}</td>
    <td>${maquina.costoAlquiler * maquina.stockAlquiladas + maquina.encendidoApagado * maquina.costoEncendido}</td>
    </tr>`
    sumaTotal = sumaTotal + ((maquina.costoAlquiler * maquina.stockAlquiladas) + (maquina.encendidoApagado * maquina.costoEncendido));
  }   
}
document.querySelector("#pInresosMaquinasVirtualesAdm").innerHTML = `La suma total de los alquileres es U$S ${sumaTotal}`
}

