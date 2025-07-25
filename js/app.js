
/*const nombre = document.querySelector("#nombre");
const cliente = document.querySelector("#cliente");
const telefono = document.querySelector("#telefono");
const fecha = document.querySelector("#fecha");
const hora = document.querySelector("#hora");
const tipoEvento = document.querySelector("#tipo");
const personas = document.querySelector("#personas");
const costo = document.querySelector("#costo");
const estadoPago = document.querySelector("#estado");
const metodoPago = document.querySelector("#metodoPago");
const notas = document.querySelector("#notas");

const formularioEvento = document.querySelector("#formulario-evento");
const eventosDiv = document.querySelector("#lista-eventos");

let editando = false;
let idEdicion = null;

// OBJETO PARA GUARDAR DATOS DEL FORMULARIO
const eventoObj = {
  nombre: "",
  cliente: "",
  telefono: "",
  fecha: "",
  hora: "",
  tipo: "",
  personas: "",
  costo: "",
  estado: "",
  metodoPago: "",
  notas: "",
};

// MENSAJE
class Mensaje {
  constructor({ texto, tipo }) {
    this.texto = texto;
    this.tipo = tipo;
    this.mostrar();
  }
  mostrar() {
    const alerta = document.createElement("div");
    const alertaPrevia = document.querySelector(".alerta");
    if (alertaPrevia) alertaPrevia.remove();

    alerta.textContent = this.texto;
    alerta.classList.add("alerta");
    if (this.tipo === "error") {
      alerta.classList.add("alerta-error");
    } else {
      alerta.classList.add("alerta-exito");
    }

    formularioEvento.parentElement.insertBefore(alerta, formularioEvento);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

// ADMINISTRADOR DE EVENTOS
class AdminEventos {
  constructor() {
    this.eventos = [];
  }

  agregar(evento) {
    this.eventos.push(evento);
    this.mostrar();
    this.sincronizarStorage();
  }

  editar(eventoActualizado) {
    this.eventos = this.eventos.map((evento) =>
      evento.id === eventoActualizado.id ? eventoActualizado : evento
    );
    this.mostrar();
    this.sincronizarStorage();
  }

  eliminar(id) {
    this.eventos = this.eventos.filter((evento) => evento.id !== id);
    this.mostrar();
    this.sincronizarStorage();
  }

  mostrar() {
    // Ordenar eventos por fecha y hora
    this.eventos.sort((a, b) => {
      const fechaHoraA = new Date(`${a.fecha}T${a.hora}`);
      const fechaHoraB = new Date(`${b.fecha}T${b.hora}`);
      return fechaHoraA - fechaHoraB;
    });

    eventosDiv.innerHTML = "";

    if (this.eventos.length === 0) {
      eventosDiv.innerHTML = '<p>No hay eventos registrados.</p>';
      return;
    }

    this.eventos.forEach((evento) => {
      const div = document.createElement("div");
      div.classList.add("evento");
      div.dataset.id = evento.id;

      div.innerHTML = `
                <h3>${evento.nombre}</h3>
                <p><strong>Fecha:</strong> ${evento.fecha}</p>
                <p><strong>Hora:</strong> ${evento.hora}</p>
                <p><strong>Cliente:</strong> ${evento.cliente}</p>
                <p><strong>Teléfono:</strong> ${evento.telefono}</p>
                <p><strong>Personas:</strong> ${evento.personas}</p>
                <p><strong>Costo:</strong> ₡${evento.costo}</p>
                <p><strong>Notas:</strong> ${evento.notas}</p>
                <p><strong>Tipo:</strong> ${evento.tipo}</p>
                <p><strong>Estado:</strong> ${evento.estado}</p>
                <p><strong>Método de Pago:</strong> ${evento.metodoPago}</p>
            `;

      // Botones Editar y Eliminar
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.classList.add("btn-editar");
      btnEditar.onclick = () => cargarEdicion(evento);

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btn-eliminar");
      btnEliminar.onclick = () => this.eliminar(evento.id);

      const contenedorBotones = document.createElement("div");
      contenedorBotones.classList.add("acciones");
      contenedorBotones.appendChild(btnEditar);
      contenedorBotones.appendChild(btnEliminar);

      div.appendChild(contenedorBotones);
      eventosDiv.appendChild(div);
    });
  }

  sincronizarStorage() {
    localStorage.setItem("eventos", JSON.stringify(this.eventos));
  }

  cargarEventosStorage() {
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || [];
    this.eventos = eventosGuardados;
    this.mostrar();
  }
}

// INSTANCIA
const adminEventos = new AdminEventos();
adminEventos.cargarEventosStorage();

// EVENTOS para actualizar el objeto temporal en cada cambio
formularioEvento.addEventListener("input", (e) => {
  const name = e.target.name;
  const value = e.target.value;
  eventoObj[name] = value;
});

// Enviar formulario
formularioEvento.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validar que no haya campos vacíos excepto 'notas' que puede estar vacía
  for (const key in eventoObj) {
    if (key === "notas") continue; // notas opcional
    if (!eventoObj[key] || eventoObj[key].toString().trim() === "") {
      new Mensaje({ texto: "Todos los campos son obligatorios excepto Notas", tipo: "error" });
      return;
    }
  }

  if (editando) {
    // Editar evento
    adminEventos.editar({ ...eventoObj, id: idEdicion });
    new Mensaje({ texto: "Evento actualizado correctamente", tipo: "exito" });
    editando = false;
    idEdicion = null;
    formularioEvento.querySelector("button[type='submit']").textContent = "Agregar Evento";
  } else {
    // Crear nuevo evento con id único
    const nuevoEvento = { ...eventoObj, id: generarId() };
    adminEventos.agregar(nuevoEvento);
    new Mensaje({ texto: "Evento agregado correctamente", tipo: "exito" });
  }

  reiniciarFormulario();
});

// Función para cargar evento en formulario para edición
function cargarEdicion(evento) {
  editando = true;
  idEdicion = evento.id;

  // Poner valores en inputs
  nombre.value = evento.nombre;
  cliente.value = evento.cliente;
  telefono.value = evento.telefono;
  fecha.value = evento.fecha;
  hora.value = evento.hora;
  tipoEvento.value = evento.tipo;
  personas.value = evento.personas;
  costo.value = evento.costo;
  estadoPago.value = evento.estado;
  metodoPago.value = evento.metodoPago;
  notas.value = evento.notas;

  // Actualizar el objeto temporal para que no dé error si se presiona guardar sin cambiar nada
  Object.assign(eventoObj, { ...evento });

  formularioEvento.querySelector("button[type='submit']").textContent = "Guardar Cambios";
}

// Reiniciar formulario y objeto temporal
function reiniciarFormulario() {
  formularioEvento.reset();
  for (const key in eventoObj) {
    eventoObj[key] = "";
  }
}

// Generador simple de ID
function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}*/

import { Evento, AdminEventos } from "./eventos.js";
import { UI } from "./ui.js";
import { Mensaje } from "./modal.js";

const formulario = document.querySelector("#formulario-evento");
const inputs = formulario.querySelectorAll("input, select, textarea");
const btnSubmit = formulario.querySelector("button[type='submit']");

let editando = false;
let idEdicion = null;
const eventoTemp = {};

const adminEventos = new AdminEventos();
const ui = new UI(adminEventos, cargarEdicion);
ui.mostrar(adminEventos.eventos);

inputs.forEach(input => {
  input.addEventListener("input", e => {
    eventoTemp[e.target.name] = e.target.value;
  });
});

formulario.addEventListener("submit", e => {
  e.preventDefault();

  const evento = {
    nombre: nombre.value.trim(),
    cliente: cliente.value.trim(),
    telefono: telefono.value.trim(),
    fecha: fecha.value,
    hora: hora.value,
    tipo: tipo.value,
    personas: personas.value,
    costo: costo.value,
    estado: estado.value,
    metodoPago: metodoPago.value,
    notas: notas.value.trim(),
    id: Date.now()
  };

  const fechaEvento = new Date(`${evento.fecha}T${evento.hora}`);
  const fechaActual = new Date();

  if (fechaEvento <= fechaActual) {
    alert("❌ No puedes registrar un evento con fecha u hora pasada.");
    return;
  }

  const yaExiste = adminEventos.eventos.some(ev => 
    ev.fecha === evento.fecha &&
    ev.hora === evento.hora &&
    (!editando || ev.id !== idEdicion) 
  );

  const camposRequeridos = ["nombre", "cliente", "telefono", "fecha", "hora", "tipo", "personas", "costo", "estado", "metodoPago"];
  for (const campo of camposRequeridos) {
    if (!eventoTemp[campo] || eventoTemp[campo].trim() === "") {
      new Mensaje({ texto: "Todos los campos son obligatorios excepto Notas", tipo: "error" });
      return;
    }
  }

  if (editando) {
    // Aplica el 13% al costo antes de editar
    const costoBase = parseFloat(eventoTemp.costo);
    if (!isNaN(costoBase)) {
      const costoConImpuesto = costoBase * 1.13;
      eventoTemp.costo = costoConImpuesto.toFixed(2);
    }

    const eventoEditado = new Evento({ ...eventoTemp, id: idEdicion });
    adminEventos.editar(eventoEditado);
    new Mensaje({ texto: "Evento actualizado correctamente", tipo: "exito" });
    btnSubmit.textContent = "Agregar Evento";
    editando = false;
    idEdicion = null;
  } else {
    // Aplica el 13% al costo al agregar
    const costoBase = parseFloat(eventoTemp.costo);
    if (!isNaN(costoBase)) {
      const costoConImpuesto = costoBase * 1.13;
      eventoTemp.costo = costoConImpuesto.toFixed(2);
    }

    const nuevoEvento = new Evento(eventoTemp);
    adminEventos.agregar(nuevoEvento);
    new Mensaje({ texto: "Evento agregado correctamente", tipo: "exito" });
  }

  formulario.reset();
  Object.keys(eventoTemp).forEach(key => eventoTemp[key] = "");
  ui.mostrar(adminEventos.eventos);
});

function cargarEdicion(evento) {
  editando = true;
  idEdicion = evento.id;
  btnSubmit.textContent = "Guardar Cambios";

  Object.entries(evento).forEach(([key, val]) => {
    const input = formulario.elements[key];
    if (input) input.value = val;
    eventoTemp[key] = val;
  });
}