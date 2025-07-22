export class UI {
  constructor(adminEventos, cargarEdicion) {
    this.adminEventos = adminEventos;
    this.cargarEdicion = cargarEdicion;
    this.contenedor = document.querySelector("#lista-eventos");
  }

  mostrar(eventos) {
    this.contenedor.innerHTML = "";

    if (eventos.length === 0) {
      this.contenedor.innerHTML = '<p>No hay eventos registrados.</p>';
      return;
    }

    eventos.forEach((evento) => {
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

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.classList.add("btn-editar");
      btnEditar.onclick = () => this.cargarEdicion(evento);

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btn-eliminar");
      btnEliminar.onclick = () => {
        this.adminEventos.eliminar(evento.id);
        this.mostrar(this.adminEventos.eventos);
      };

      const contenedorBotones = document.createElement("div");
      contenedorBotones.classList.add("acciones");
      contenedorBotones.append(btnEditar, btnEliminar);

      div.appendChild(contenedorBotones);
      this.contenedor.appendChild(div);
    });
  }
}
