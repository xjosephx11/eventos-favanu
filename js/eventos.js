export class Evento {
  constructor({ nombre, cliente, telefono, fecha, hora, tipo, personas, costo, estado, metodoPago, notas, id }) {
    this.nombre = nombre;
    this.cliente = cliente;
    this.telefono = telefono;
    this.fecha = fecha;
    this.hora = hora;
    this.tipo = tipo;
    this.personas = personas;
    this.costo = costo;
    this.estado = estado;
    this.metodoPago = metodoPago;
    this.notas = notas;
    this.id = id || Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}

export class AdminEventos {
  constructor() {
    this.eventos = JSON.parse(localStorage.getItem("eventos")) || [];
  }

  agregar(evento) {
    this.eventos.push(evento);
    this.sincronizarStorage();
  }

  editar(eventoActualizado) {
    this.eventos = this.eventos.map(e => e.id === eventoActualizado.id ? eventoActualizado : e);
    this.sincronizarStorage();
  }

  eliminar(id) {
    this.eventos = this.eventos.filter(e => e.id !== id);
    this.sincronizarStorage();
  }

  sincronizarStorage() {
    localStorage.setItem("eventos", JSON.stringify(this.eventos));
  }
}