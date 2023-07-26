export function carrusel(listadoIntegrantes) {
  let centroPantalla = calcularCentroPantalla();
  function autoScroll() {
    listadoIntegrantes.scrollBy({ left: 340, behavior: "smooth" });
    let cards = Array.from(document.getElementsByClassName("integrante"));
    cards.forEach((card) => {
      verificarCardCentro(card);
    });
  }
  setInterval(autoScroll, 5000);

  function calcularCentroPantalla() {
    return window.innerWidth / 2;
  }

  window.addEventListener("resize", () => {
    centroPantalla = calcularCentroPantalla();
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
    // console.log(card);
    /*   console.log(cardOffsetLeft, cardWidth, centroPantalla, leftLimit, righLimit);
     */
  }
}
