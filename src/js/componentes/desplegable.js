document.addEventListener("click", function (event) {
  let desplegable_actual = event.target;
  if (!desplegable_actual.classList.contains("desplegable_select")) {
    desplegable_actual = desplegable_actual.closest(".desplegable_select");
  }
  if (!desplegable_actual) {
    return;
  }
  desplegable_actual.classList.toggle("mostrar-opciones");

  let desplegables = Array.from(document.getElementsByClassName("desplegable_select"));

  let demasDesplegables = desplegables.filter((despl) => despl !== desplegable_actual);

  demasDesplegables.forEach((desplegable) => {
    desplegable.classList.remove("mostrar-opciones");
  });
});
