const listadoIntegrantes = document.querySelector(".listado_integrantes");

/* document.addEventListener("DOMContentLoaded", () => {
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
}); */

// Función para desplazar automáticamente el carrusel

/* function autoScroll() {
  listadoIntegrantes.scrollBy({ left: 300, behavior: "smooth" });
}
setInterval(autoScroll, 5000); */

// Función para detectar la tarjeta en el centro y aplicar la clase del hover
function detectarCentro() {
  // Obtener el ancho del contenedor y la posición del scroll horizontal
  const contenedorAncho = listadoIntegrantes.clientWidth;
  const scrollPosicion = listadoIntegrantes.scrollLeft;

  // Obtener las tarjetas y su ancho total
  const tarjetas = listadoIntegrantes.querySelectorAll(".integrante");
  const tarjetasAnchoTotal = Array.from(tarjetas).reduce(
    (total, tarjeta) => total + tarjeta.clientWidth,
    0
  );

  // Calcular la posición del centro en el carrusel
  const centroPosicion = scrollPosicion + contenedorAncho / 2;

  // Encontrar la tarjeta que está en el centro
  let tarjetaCentro = null;
  let acumuladoAncho = 0;
  for (const tarjeta of tarjetas) {
    acumuladoAncho += tarjeta.clientWidth + 10; // 10 es el margen derecho entre tarjetas
    if (acumuladoAncho >= centroPosicion) {
      tarjetaCentro = tarjeta;
      break;
    }
  }

  // Remover la clase del hover de todas las tarjetas
  tarjetas.forEach((tarjeta) => {
    tarjeta.classList.remove("hover-activo");
  });

  // Agregar la clase del hover a la tarjeta del centro
  if (tarjetaCentro) {
    tarjetaCentro.classList.add("hover-activo");
  }
}

// Detectar el centro al hacer scroll en el carrusel
listadoIntegrantes.addEventListener("scroll", detectarCentro);

// Detectar el centro al cargar la página
detectarCentro();
