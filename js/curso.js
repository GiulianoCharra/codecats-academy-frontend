var desplegables = Array.from(document.getElementsByClassName("desplegable__clases"));
desplegables.forEach((desplegable) => {
  desplegable.addEventListener("click", () => {
    desplegable.classList.toggle("mostrar-clases");
  });
});

var desplegables = Array.from(document.getElementsByClassName("modulo"));
desplegables.forEach((desplegable) => {
  desplegable.addEventListener("click", () => {
    desplegable.classList.toggle("mostrar-datos");
  });
});
