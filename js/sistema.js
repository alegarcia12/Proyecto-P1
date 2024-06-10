class Sistema {
  constructor() {
    //Array de usuariosAdministrador
    this.usuariosAdministrador = [
      new UsuarioAdministrador(1, "Alejandro Garcia", "alegarcia", "Adm123"),
      new UsuarioAdministrador(2, "Rodrigo Zamora", "rodrizamora", "Adm123"),
      new UsuarioAdministrador(3, "Mauro Nacimento", "mau", "Adm123"),
      new UsuarioAdministrador(4, "Administrador General", "admgeneral", "Adm123"),
      new UsuarioAdministrador(5, "Administrador Secundario", "admsecundario", "Adm123"),
    ];

    //Array de usuariosUser
    this.usuariosUser = [
      new UsuariosUser (1, 'Usuario1','Usuario1Apellido' , 'usu1', 'Usu123', 4548812049400004, 285, 'activo'),
      new UsuariosUser (2, 'Usuario2','Usuario2Apellido' , 'usu2', 'Usu123', 4548032003933011, 123, 'activo'),
      new UsuariosUser (3, 'Usuario3','Usuario3Apellido' , 'usu3', 'Usu123', 5540500001000004, 989, 'bloqueado'),
      new UsuariosUser (4, 'Usuario4','Usuario4Apellido' , "usu4", "Usu123", 5020470001370055, 989, 'pendiente'),
      new UsuariosUser (5, 'Usuario5','Usuario5Apellido' , "usu5", "Usu123", 5020080001000006, 989, 'pendiente'),
    ]

    //Array de maquinas para alquilar
    this.maquina = [
      new Maquina (1, "Optimizadas para computo c7.small" , 20, 2.50 , 10, 1, 0),
      new Maquina (2, "Optimizadas para computo c7.medium" ,30, 3.50, 10, 1, 2),
      new Maquina (3, "Optimizadas para computo c7.large" ,50, 6, 10, 1, 4),
      new Maquina (4, "Optimizadas para memoria r7.small" ,35, 4, 10, 2, 1),
      new Maquina (5, "Optimizadas para memoria r7.medium" ,50, 6.50, 10, 1, 1),
      new Maquina (6, "Optimizadas para memoria r7.large" ,60, 7, 10, 1, 0),
      new Maquina (7, "Optimizadas para almacenamiento i7.medium" ,30, 3.50, 10, 1, 1),
      new Maquina (8, "Optimizadas para almacenamiento i7.large" ,50, 6.50, 10, 2, 4),
    ]
    
    //Array de maquinas alquiladas por los usuarios
    this.maquinaAlquiler = [
      new MaquinaAlquiler(1,1,1,"Encendida",0,"Optimizadas para computo c7.small"),       
      new MaquinaAlquiler(2,2,1,"Encendida",2,"Optimizadas para computo c7.medium"),
      new MaquinaAlquiler(3,3,1,"Encendida",4,"Optimizadas para computo c7.large"),
      new MaquinaAlquiler(4,4,2,"Encendida",1,"Optimizadas para memoria r7.small"),
      new MaquinaAlquiler(5,4,2,"Encendida",0,"Optimizadas para memoria r7.small"),
      new MaquinaAlquiler(6,5,2,"Encendida",1,"Optimizadas para memoria r7.medium"),
      new MaquinaAlquiler(7,6,2,"Encendida",0, "Optimizadas para memoria r7.large"),
      new MaquinaAlquiler(8,7,2,"Encendida",1,"Optimizadas para almacenamiento i7.medium"),
      new MaquinaAlquiler(9,8,1,"Encendida",1, "Optimizadas para almacenamiento i7.large"),
      new MaquinaAlquiler(10,8,2,"Encendida",3,"Optimizadas para almacenamiento i7.large"),  
    ];

  }
  
  //Función que verifica stock de las máquinas y aumenta contador de máquina alquiladas
  stockSuficiente(arrElementos, propiedad, busqueda){
    let hayStock = false;
    for (let i = 0; i < arrElementos.length; i++) {
        const unaMaquina = arrElementos[i];
        if(unaMaquina[propiedad] === busqueda){
            if(unaMaquina.stock - unaMaquina.stockAlquiladas > 0){
            hayStock = true;
            unaMaquina.stockAlquiladas += 1
          }
        }
    }
    return hayStock;
  }

  //Función para agregar máquina alquilada al array "maquinaAlquiler". 
  agregarMaquinaAlquilada(maquinaAlquilada){
   this.maquinaAlquiler.push(maquinaAlquilada);
 } 

// Funcion para obtener un objeto dentro de un Array, pasandole parametros de busqueda.
obtenerObjeto(arrElementos, propiedad, busqueda){
  let objeto = null;
    for (let i = 0; i < arrElementos.length; i++) {
        const unElemento = arrElementos[i];
        if(unElemento[propiedad] === busqueda){
            objeto = unElemento;
            break;
        }
    }
    return objeto;
}

//Función que retorna si un elemento existe dentro de un array. 
buscarElemento(arrElementos, propiedad, busqueda){
  let existe = false;
  for (let i = 0; i < arrElementos.length; i++) {
      const unElemento = arrElementos[i];
      if(unElemento[propiedad] === busqueda){
          existe = true;
          break;
      }
  }
  return existe;
}

//Función para agregar un nuevo usuario al array "usuariosUser". 
agregarUsuario(usuario){
  this.usuariosUser.push(usuario)
}

//Función que verifica que el nombre de usuario corresponda a la contraseña y al tipo de usuario 
// y guarda el objeto del que se va a loguear, dentro de una variable global.
verificarLogin(nombreUsuario,claveUsuario, array){
  let resultado = false;
  let unUsuario = this.obtenerObjeto(array, 'nombreUsuario', nombreUsuario);

  if (unUsuario !== null){
      if (unUsuario.contrasenia === claveUsuario){
          usuarioLogueado = unUsuario;
          resultado = true;
      }
  }
  return resultado;
}

//Función que chequea que se hayan ingresado todos los campos.
validarCamposVaciosRegistro(pNombre,pApellido,pNombreUsuario,pClave,pCvc){
  let camposValidos = false;
  if (pNombre !== "" && pApellido !== "" && pNombreUsuario!== "" && pClave!== "" && pCvc !== ""){
      camposValidos = true;
  }
  return camposValidos;
}

//Función que chequea que el nombre de usuario sea correcto.
validarNombre(nombreUsuario){
  let nombreOK = false;
    for (let i = 0; i < nombreUsuario.length; i++){
      let letra = nombreUsuario[i];
      if(letra.charCodeAt() >= 48 && letra.charCodeAt() <= 57 || letra.charCodeAt() >= 64 && letra.charCodeAt() <= 90 || letra.charCodeAt() >= 97 && letra.charCodeAt() <= 122 || letra === '-' || letra === '_' || letra === '.'){
        nombreOK = true;
      } else {
        nombreOK = false;
        break;
      }
    }
    return nombreOK;
}

// Funcion que verifica que el formato de la clave sea el correcto.
verificarFormatoPass(pClave){
  let valido = false;
  let contadorMayus = 0;
  let contadorMinus = 0;
  let contadorNum = 0;

  if (pClave.length >= 5){
    for (let i = 0; i < pClave.length; i++) {
      const letra = pClave[i];
      if (letra === letra.toUpperCase() && isNaN(letra)){
        contadorMayus++;
      }
      if (letra === letra.toLowerCase() && isNaN(letra)){
        contadorMinus++;
      }
      if (!isNaN(letra)){
        contadorNum++;
      }
    }
  }
  if (contadorMayus >=1 && contadorMinus >= 1 && contadorNum >= 1){
    valido = true;
  }
  return valido;
}

//Función que chequea que la tarjeta ingresada sea correcta.
validarTarjetaIngresada(tarjeta){
  let tarjetaOk = "";
  let contadorGuiones = 0;

  for (let i = 0; i < tarjeta.length; i++) {
    const caracter = tarjeta[i];
    if (caracter === "-"){
      contadorGuiones++
    }
  }

    for (let i = 0; i < tarjeta.length; i++){
      
      const caracter = tarjeta[i];
    if (caracter != "-" && contadorGuiones === 3){
      
      tarjetaOk += caracter;
      }
    }
  return tarjetaOk;
}

//Función que chequea que el CVC sea correcto.
validarCvc(cvc){
  let resultado = false;
  if (!isNaN(cvc) && cvc.length === 3){
    resultado = true;
  }
  return resultado;
}

// Muestra los botones dependiendo del tipo de usuario que este ingresado, 
mostrarBotones(tipoUsuario){
  ocultarBotones();
  let botonesMostrar = document.querySelectorAll("." + tipoUsuario);
  for (let i = 0; i < botonesMostrar.length; i++) {
      botonesMostrar[i].style.display = "block";
      
  }
}

//Función que elimina las máquinas alquiladas del usuario bloqueado.
devolverMaquinas(idUsuarioABloquear){
  let arrayAux = [];
  
  for (let i = 0; i < this.maquinaAlquiler.length; i++) {
    const maquina = this.maquinaAlquiler[i];

    if (idUsuarioABloquear !== maquina.idUsuario){
        arrayAux.push(maquina)
      } 
    }
    this.maquinaAlquiler = arrayAux;
}

//Función que devuelve el stock de las máquinas alquiladas del usuario bloqueado.
devolverStock(idUsuarioABloquear){

  for (let i = 0; i < this.maquinaAlquiler.length; i++) {
    const maquina = this.maquinaAlquiler[i];
    if (idUsuarioABloquear === maquina.idUsuario){
      this.sumarMaquina(maquina.idMaquina, maquina.alquiler);
      } 
    }
}

//Función que recibe ID maquina alquiler y un id de maquina, 
//y elimina los encendidos de esa máquina alquilada por el usuario bloqueado.
sumarMaquina(idMaquina, idAlquiler){
  let maquinaActual =this.obtenerObjeto(this.maquina, "idMaquina", idMaquina);
  let alquilerActual = this.obtenerObjeto(this.maquinaAlquiler, "alquiler",idAlquiler);
  maquinaActual.stockAlquiladas--;
  maquinaActual.encendidoApagado = maquinaActual.encendidoApagado - alquilerActual.encendido;
}

//Función que aumenta el encendido de una máquina alquilada.
encendidoApagadoMaquina(idMaquinaAlquiler){

  for(let i=0;i < this.maquina.length;i++){
    let maquina = this.maquina[i];
    if(idMaquinaAlquiler === maquina.idMaquina){
      maquina.encendidoApagado++
    }
  }
}

//FUNCION DE LUHN
algoritmoLuhn(pNumero) {
  /*Se estara iterando numero a numero, desde el final del string hasta el primer caracter, se estarán
    sumando y sustituyendo por duplicado cuando sea par, ya que sería el segundo nro. */
  let suma = 0;
  let digitoVerificadorX = Number(pNumero.charAt(pNumero.length - 1));
  let contador = 0; //para saber cuando estamos en los segundos, lo pares.
  let haynro = true;
  let i = pNumero.length - 2; //el penúltimo.


  //Mientras los numeros sea mayor o igual a 0 se estara tomando cada caracter
  while (i >= 0 && haynro) {
    //Obtener el numero
    let caracter = pNumero.charAt(i);
    //Valida que el número sea válido
    if (!isNaN(caracter)) {
      let num = Number(caracter);
      //Duplicando cada segundo dígito
      if (contador % 2 == 0) {
        num = this.duplicarPar(num); //porque si es mayor a 9 se deben sumar.
      }
      suma += num;
    } else {
      haynro = false;
    }
    i--;
    contador++;
  }
  let digitoVerificadorValido = this.checkDigito(suma, digitoVerificadorX);
  let modulodelasumaValiado = this.checkModulo(suma, digitoVerificadorX);
  return digitoVerificadorValido && modulodelasumaValiado;

}

duplicarPar(pNum) {
  pNum = pNum * 2;
  if (pNum > 9) {
    /*Si el resultado del multiplicación es mayor a 9 entonces lo descomponemos y sumamos. 
     Como el numero sera x>=10 && x<=19
     Entonces es 1+(num % 10) 1 más el resto de dividir entre 10.*/
    pNum = 1 + (pNum % 10);
  }
  return pNum;
}

checkDigito(pSuma, pDigito) {
  /* 1. Calcular la suma de los dígitos (67).
2. Multiplicar por 9 (603).
3. Tomar el último dígito (3).
4. El resultado es el dígito de chequeo.*/
  let total = 9 * pSuma;
  let ultimoNro = total % 10
  return ultimoNro === pDigito;
}

checkModulo(pSuma, pDigito) {
  /*
  Si el total del módulo 10 es igual a O (si el total termina en cero), entonces el número es válido 
de acuerdo con la fórmula Luhn, de lo contrario no es válido.
  */
  let total = pSuma + pDigito;
  let validacionFinal = false;
  if (total % 10 === 0 && total !== 0) {
    validacionFinal = true;
  }
  return validacionFinal;
}

//ACA TERMINA FUNCION DE TARJETA DE CREDITO
//ACA TERMINA SISTEMA
}


