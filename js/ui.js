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

      const btnFactura = document.createElement('button');
      btnFactura.textContent = 'Generar Factura';
      btnFactura.classList.add('btn-factura');

      
      btnFactura.addEventListener('click', () => {
        generarFactura(evento);
      });

      const contenedorBotones = document.createElement("div");
      contenedorBotones.classList.add("acciones");
      contenedorBotones.append(btnEditar, btnEliminar, btnFactura);

      div.appendChild(contenedorBotones);
      this.contenedor.appendChild(div);
    });
  }
}
/*
export function generarFactura(evento) {
  const jsPDF = window.jspdf.jsPDF;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Factura - Salon de Eventos FAVANU", pageWidth / 2, y, { align: "center" });
  y += 15;

  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  function escribirLinea(etiqueta, valor) {
    doc.setFont("helvetica", "bold");
    doc.text(`${etiqueta}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(valor), margin + 50, y);
    y += 10;
  }

  escribirLinea("Nombre del Evento", evento.nombre);
  escribirLinea("Cliente", evento.cliente);
  escribirLinea("Teléfono", evento.telefono);
  escribirLinea("Fecha", evento.fecha);
  escribirLinea("Hora", evento.hora);
  escribirLinea("Tipo de Evento", evento.tipo);
  escribirLinea("Cantidad de Personas", evento.personas);

  const costoBase = (parseFloat(evento.costo) / 1.13).toFixed(2);
  const costoConIVA = parseFloat(evento.costo).toFixed(2);

  escribirLinea("Costo (antes IVA)", `₡${costoBase}`);
  escribirLinea("Costo (con IVA 13%)", `₡${costoConIVA}`);

  escribirLinea("Estado de Pago", evento.estado);
  escribirLinea("Método de Pago", evento.metodoPago);
  escribirLinea("Notas", evento.notas || "Ninguna");

  y += 10;
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  const fechaEmision = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Fecha de emisión: ${fechaEmision}`, margin, y);

  doc.save(`Factura_${evento.nombre.replace(/\s+/g, "_")}.pdf`);
}*/

/*
export function generarFactura(evento) {
  const jsPDF = window.jspdf.jsPDF;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Factura - Salon de Eventos FAVANU", pageWidth / 2, y, { align: "center" });
  y += 15;

  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  function escribirLinea(etiqueta, valor) {
    doc.setFont("helvetica", "bold");
    doc.text(`${etiqueta}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(valor), margin + 50, y);
    y += 10;
  }

  escribirLinea("Nombre del Evento", evento.nombre);
  escribirLinea("Cliente", evento.cliente);
  escribirLinea("Teléfono", evento.telefono);
  escribirLinea("Fecha", evento.fecha);
  escribirLinea("Hora", evento.hora);
  escribirLinea("Tipo de Evento", evento.tipo);
  escribirLinea("Cantidad de Personas", evento.personas);

  const costoBase = (parseFloat(evento.costo) / 1.13).toFixed(2);
  const costoConIVA = parseFloat(evento.costo).toFixed(2);

  escribirLinea("Costo (antes IVA)", `₡${costoBase}`);
  escribirLinea("Costo (con IVA 13%)", `₡${costoConIVA}`);

  escribirLinea("Estado de Pago", evento.estado);
  escribirLinea("Método de Pago", evento.metodoPago);
  escribirLinea("Notas", evento.notas || "Ninguna");

  y += 10;
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  const fechaEmision = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Fecha de emisión: ${fechaEmision}`, margin, y);

  // Información del salón - al final de la factura
  y += 15;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Información del Salón de Eventos", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text("Propietario: Joseph Gamboa", margin, y);
  y += 7;
  doc.text("Dirección: San José, Costa Rica", margin, y);
  y += 7;
  doc.text("Teléfono: 8888-8888", margin, y);
  y += 7;
  doc.text("Email: salonfavanu@email.com", margin, y);
  y += 7;
  doc.text("NIT: 3-123-456789", margin, y);
  y += 10;
  doc.setFont("helvetica", "italic");
  doc.text("¡Gracias por preferirnos!", pageWidth / 2, y, { align: "center" });

  doc.save(`Factura_${evento.nombre.replace(/\s+/g, "_")}.pdf`);
}*/
/*
export function generarFactura(evento) {
  const jsPDF = window.jspdf.jsPDF;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 30;

  // Título grande y centrado
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Factura - Salón de Eventos FAVANU", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Línea horizontal separadora
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;

  // Texto normal tamaño estándar
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  // Función para imprimir etiqueta y valor alineados
  function escribirLinea(etiqueta, valor) {
    doc.setFont("helvetica", "bold");
    doc.text(`${etiqueta}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(valor), margin + 60, y);
    y += 10;
  }

  // Datos del evento
  escribirLinea("Nombre del Evento", evento.nombre);
  escribirLinea("Cliente", evento.cliente);
  escribirLinea("Teléfono", evento.telefono);
  escribirLinea("Fecha", evento.fecha);
  escribirLinea("Hora", evento.hora);
  escribirLinea("Tipo de Evento", evento.tipo);
  escribirLinea("Cantidad de Personas", evento.personas);

  const costoBase = (parseFloat(evento.costo) / 1.13).toFixed(2);
  const costoConIVA = parseFloat(evento.costo).toFixed(2);

  escribirLinea("Costo (antes IVA)", `₡${costoBase}`);
  escribirLinea("Costo (con IVA 13%)", `₡${costoConIVA}`);

  escribirLinea("Estado de Pago", evento.estado);
  escribirLinea("Método de Pago", evento.metodoPago);
  escribirLinea("Notas", evento.notas || "Ninguna");

  y += 10;

  // Línea horizontal separadora antes del pie
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Fecha de emisión (más pequeña)
  const fechaEmision = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Fecha de emisión: ${fechaEmision}`, margin, y);
  y += 15;

  // Información del salón (contacto, dirección, etc.) con estilo
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Contacto Salón de Eventos FAVANU", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text("Dirección: San José, Costa Rica", margin, y);
  y += 7;
  doc.text("Teléfono: 8888-8888", margin, y);
  y += 7;
  doc.text("Correo: salonfavanu@email.com", margin, y);
  y += 10;

  // Mensaje de agradecimiento en cursiva y centrado
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text("¡Gracias por confiar en nosotros!", pageWidth / 2, y, { align: "center" });

  // Guardar PDF con nombre seguro
  doc.save(`Factura_${evento.nombre.replace(/\s+/g, "_")}.pdf`);
}*/

export function generarFactura(evento) {
  const jsPDF = window.jspdf.jsPDF;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let y = 20;

  // Logo placeholder
  doc.setFillColor(30, 144, 255); // azul dodger
  doc.rect(margin, y, 40, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("FAVANU", margin + 20, y + 14, { align: "center" });
  y += 30;

  // Título principal
  doc.setTextColor(0);
  doc.setFontSize(22);
  doc.text("Factura - Salón de Eventos", pageWidth / 2, y, { align: "center" });
  y += 10;

  // Línea horizontal azul suave
  doc.setDrawColor(100, 149, 237);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;

  // Encabezado azul para sección evento
  doc.setFillColor(100, 149, 237);
  doc.rect(margin, y, pageWidth - 2 * margin, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Datos del Evento", margin + 5, y + 7);
  y += 20;

  // Texto normal negro
  doc.setTextColor(0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  function escribirLinea(etiqueta, valor) {
    doc.setFont("helvetica", "bold");
    doc.text(`${etiqueta}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(String(valor), margin + 50, y);
    y += 10;
  }

  escribirLinea("Nombre del Evento", evento.nombre);
  escribirLinea("Cliente", evento.cliente);
  escribirLinea("Teléfono", evento.telefono);
  escribirLinea("Fecha", evento.fecha);
  escribirLinea("Hora", evento.hora);
  escribirLinea("Tipo de Evento", evento.tipo);
  escribirLinea("Cantidad de Personas", evento.personas);

  y += 10;
  doc.setFillColor(230, 230, 250);
  doc.rect(margin, y, pageWidth - 2 * margin, 40, 'F');

  doc.setFont("helvetica", "bold");
  doc.text("Concepto", margin + 10, y + 10);
  doc.text("Monto (₡)", pageWidth - margin - 60, y + 10, { align: "right" });
  doc.setFont("helvetica", "normal");

  const costoBase = (parseFloat(evento.costo) / 1.13).toFixed(2);
  const costoConIVA = parseFloat(evento.costo).toFixed(2);
  const iva = (costoConIVA - costoBase).toFixed(2);

  doc.text("Costo (antes IVA)", margin + 10, y + 20);
  doc.text(`₡${costoBase}`, pageWidth - margin - 10, y + 20, { align: "right" });

  doc.text("IVA 13%", margin + 10, y + 30);
  doc.text(`₡${iva}`, pageWidth - margin - 10, y + 30, { align: "right" });

  doc.text("Costo Total (con IVA)", margin + 10, y + 40);
  doc.text(`₡${costoConIVA}`, pageWidth - margin - 10, y + 40, { align: "right" });

  y += 55;

  escribirLinea("Estado de Pago", evento.estado);
  escribirLinea("Método de Pago", evento.metodoPago);

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.text("Notas:", margin, y);
  doc.setFont("helvetica", "normal");
  y += 7;
  const notas = evento.notas || "Ninguna";
  const notasMaxWidth = pageWidth - 2 * margin;
  const notasLines = doc.splitTextToSize(notas, notasMaxWidth);
  doc.text(notasLines, margin, y);
  y += notasLines.length * 7 + 10;

  // Línea separadora
  doc.setDrawColor(100, 149, 237);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Fecha de emisión
  const fechaEmision = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Fecha de emisión: ${fechaEmision}`, margin, y);
  y += 15;

  // Comprobamos si el texto siguiente se saldría del área visible y hacemos salto de página
  const espacioRestante = pageHeight - y - 60; // margen extra para info del salon
  if (espacioRestante < 0) {
    doc.addPage();
    y = margin;
  }

  // Información del salón de eventos
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Información del Salón de Eventos FAVANU", margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.text("Propietario: Joseph Gamboa", margin, y);
  y += 7;
  doc.text("Dirección: San José, Costa Rica", margin, y);
  y += 7;
  doc.text("Teléfono: 8888-8888", margin, y);
  y += 7;
  doc.text("Email: salonfavanu@email.com", margin, y);
  y += 7;
  doc.text("NIT: 3-123-456789", margin, y);
  y += 15;

  // Mensaje de agradecimiento centrado
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text("¡Gracias por preferirnos!", pageWidth / 2, y, { align: "center" });

  // Guardar PDF
  doc.save(`Factura_${evento.nombre.replace(/\s+/g, "_")}.pdf`);
}