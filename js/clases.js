// Clase para crear usuarios Adm
class UsuarioAdministrador {
  constructor(unId, unNombreCompleto, unNombreDeUsuario, unaContrasenia) {
    this.idUsuario = unId;
    this.nombreCompleto = unNombreCompleto;
    this.nombreUsuario = unNombreDeUsuario;
    this.contrasenia = unaContrasenia;
  }
}

//Clase para crear usuarios User
class UsuariosUser {
  constructor(unId, unNombre, unApellido, unNombreDeUsuario, unaContrasenia, unaTarjeta,unCodigoCVC,unEstado) {
    this.idUsuario = unId;
    this.nombre = unNombre;
    this.apellido = unApellido;
    this.nombreUsuario = unNombreDeUsuario;
    this.contrasenia = unaContrasenia;
    this.tarjeta = unaTarjeta;
    this.codigoCvc = unCodigoCVC;
    this.estado = unEstado;
  }
}

// Clase para crear Maquinas virtuales 
class Maquina {
  constructor(unIdMaquina, unTipoMaquina, unCostoAlquiler, unCostoEncendido, unStock, unStockAlquiladas, unEncedidoApagado){
    this.idMaquina = unIdMaquina;
    this.tipoMaquina = unTipoMaquina;  
    this.costoAlquiler = unCostoAlquiler;
    this.costoEncendido = unCostoEncendido;
    this.stock = unStock;
    this.stockAlquiladas = unStockAlquiladas;
    this.encendidoApagado = unEncedidoApagado;
  }
}

//Clase para crear Maquinas Alquiladas
class MaquinaAlquiler{
  constructor(unIdAlquiler,unIdMaquina,UnidUsuario,unEstadoMaquina, unEncendidoApagado, unNombreMaquinaAlquilada){
    this.alquiler = unIdAlquiler;
    this.idMaquina = unIdMaquina;
    this.idUsuario = UnidUsuario;
    this.estadoMaquina = unEstadoMaquina;
    this.encendido = unEncendidoApagado;
    this.nombreMaquina = unNombreMaquinaAlquilada;
  }
}