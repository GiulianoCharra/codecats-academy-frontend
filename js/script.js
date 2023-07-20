const container = document.querySelector(".container");
const cardsWrapper = document.querySelector(".cards-wrapper");

container.addEventListener("scroll", () => {
  if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
    // Llegaste al final, mueve la primera card al final del carrusel
    cardsWrapper.appendChild(cardsWrapper.firstElementChild);
  }
});
