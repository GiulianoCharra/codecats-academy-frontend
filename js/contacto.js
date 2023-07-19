let desplegables = Array.from(document.getElementsByClassName("desplegable_select"));
desplegables.forEach((desplegable_actual) => {
  desplegable_actual.addEventListener("click", () => {
    desplegable_actual.classList.toggle("mostrar-opciones");
    let desplegables_limpiar = desplegables.filter((item) => item !== desplegable_actual);

    desplegables_limpiar.forEach((desplegable) => {
      desplegable.classList.remove("mostrar-opciones");
    });
  });
});
