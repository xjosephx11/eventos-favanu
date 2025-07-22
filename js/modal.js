export class Mensaje {
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
    alerta.classList.add(this.tipo === "error" ? "alerta-error" : "alerta-exito");

    document.querySelector("#formulario-evento").parentElement.insertBefore(alerta, document.querySelector("#formulario-evento"));

    setTimeout(() => alerta.remove(), 3000);
  }
}