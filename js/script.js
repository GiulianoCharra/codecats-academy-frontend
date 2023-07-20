// const contenedorListado = document.querySelector(".contenedor-listado");
// const listadoIntegrantes = document.querySelector(".listado_integrantes");

// listadoIntegrantes.addEventListener("scroll", () => {
//   if (
//     listadoIntegrantes.scrollLeft + listadoIntegrantes.clientWidth >=
//     listadoIntegrantes.scrollWidth
//   ) {
//     // Llegaste al final, mueve la primera card al final del carrusel
//     listadoIntegrantes.appendChild(listadoIntegrantes.firstElementChild);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos el contenedor del carrusel
  const carouselContainer = document.querySelector(".contenedor-listado");

  // Función para desplazar el carrusel hacia la izquierda
  const moveCarousel = () => {
    const carousel = carouselContainer.querySelector(".listado_integrantes");
    const firstCard = carousel.querySelector(".integrante");
    carousel.appendChild(firstCard);
  };

  // Definimos el intervalo para mover el carrusel cada 5 segundos (ajústalo según tus necesidades)
  setInterval(moveCarousel, 5000);
});
