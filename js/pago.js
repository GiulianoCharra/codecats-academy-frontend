
document.addEventListener("click", function (event) {
  let celda = event.target;
  if (!celda.classList.contains("celda-dia")) {
    celda = celda.closest(".celda-dia");
  }
  if (!celda) {
    return;
  }
  celda.classList.toggle("dia-seleccionado");
});
