import view from "./perfil.html";
import style from "./perfil.css";

// export default () => {
//   return (document.createElement("div").innerHTML = view);
// };

export function iniciar() {
  console.log("perfil cargado");
  const listConfig = document.querySelector("configuraciones").querySelector("configuracion");
  for (const config of listConfig) {
    config.addEventListener("click", cambiarOpcion);
  }

  function cambiarOpcion(e) {
    const opcion = e.target;

    opcionAnterior = document.querySelector(".configuracion.actual");

    opcionAnterior.classList.remove("actual");
    opcion.classList.add("actual");
  }
}
