export function buscador() {
  let btn_abrir_buscador = document.getElementById("abrir-buscador");
  let btn_cerrar_buscador = document.getElementById("cerrar-modal");
  let div_buscador_movil = document.getElementById("contenedor-buscador");
  btn_abrir_buscador.addEventListener("click", () => {
    div_buscador_movil.classList.remove("hidden");
    div_buscador_movil.classList.add("show-buscador");
  });

  btn_cerrar_buscador.addEventListener("click", () => {
    div_buscador_movil.classList.remove("show-buscador");
    div_buscador_movil.classList.add("hidden");
  });
}
