import { Evento, AdminEventos } from "./eventos.js";
import { UI, generarFactura } from "./ui.js";
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
    nombre: formulario.nombre.value.trim(),
    cliente: formulario.cliente.value.trim(),
    telefono: formulario.telefono.value.trim(),
    fecha: formulario.fecha.value,
    hora: formulario.hora.value,
    tipo: formulario.tipo.value,
    personas: formulario.personas.value,
    costo: formulario.costo.value,
    estado: formulario.estado.value,
    metodoPago: formulario.metodoPago.value,
    notas: formulario.notas.value.trim(),
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

    ui.mostrar(adminEventos.eventos);
  } else {
    const costoBase = parseFloat(eventoTemp.costo);
    if (!isNaN(costoBase)) {
      const costoConImpuesto = costoBase * 1.13;
      eventoTemp.costo = costoConImpuesto.toFixed(2);
    }

    const nuevoEvento = new Evento(eventoTemp);
    adminEventos.agregar(nuevoEvento);
    new Mensaje({ texto: "Evento agregado correctamente", tipo: "exito" });

    ui.agregarEvento(nuevoEvento);
  }

  formulario.reset();
  Object.keys(eventoTemp).forEach(key => eventoTemp[key] = "");
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