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

// Función para detectar la tarjeta en el centro y aplicar la clase del hover
/* function detectarCentro() {
  // Obtener el ancho del contenedor y la posición del scroll horizontal
  const contenedorAncho = listadoIntegrantes.clientWidth;
  const scrollPosicion = listadoIntegrantes.scrollLeft;

  // Obtener las tarjetas y su ancho total
  const tarjetas = listadoIntegrantes.querySelectorAll(".integrante");

  // Calcular la posición del centro en el carrusel
  const centroPosicion = scrollPosicion + contenedorAncho / 2;
  console.log(centroPosicion);

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
 */

let centroPantalla = calcularCentroPantalla();
function autoScroll() {
  listadoIntegrantes.scrollBy({ left: 300, behavior: "smooth" });
  let cards = Array.from(document.getElementsByClassName("integrante"));
  cards.forEach((card) => {
    verificarCardCentro(card);
  });
  console.log("");
}
setInterval(autoScroll, 5000);

function calcularCentroPantalla() {
  return window.innerWidth / 2;
}

window.addEventListener("resize", () => {
  let centroPantalla = calcularCentroPantalla();
  console.log(centroPantalla);
});

function verificarCardCentro(card) {
  document.getElementsByClassName("card");
  let cardOffsetLeft = card.offsetLeft;
  let cardWidth = card.clientWidth / 2;
  let leftLimit = centroPantalla - cardWidth;
  let righLimit = centroPantalla + cardWidth;

  if ((cardOffsetLeft > leftLimit) & (cardOffsetLeft < righLimit)) {
    card.classList.add("hover-activo");
  } else {
    card.classList.remove("hover-activo");
  }
  console.log(card);

  console.log(cardOffsetLeft, cardWidth, centroPantalla, leftLimit, righLimit);
}
