import { carrusel } from "./js/carrusel.js";
import { buscador } from "./js/buscador.js";
import { desplegable } from "./js/desplegable.js";

const estados = {
  principal: "principal",
  cursos: "cursos",
  curso: "curso",
  pago: "pago",
  perfil: "perfil",
  contacto: "contacto",
};

const cssPaginaActual = document.getElementById("cssPaginaActual");
const main = document.querySelector("main");
let links = document.querySelectorAll("a");
let estadoActual = estados.principal;
let urlActual = "./pages/principal.html";

setearLinks(links);
setPage(urlActual, estadoActual);
buscador();
desplegable();

async function cargarRecurso(url) {
  const res = await fetch(url);
  return await res.text();
}

function cargarCss(urlCss) {
  cssPaginaActual.href = urlCss;
}

async function setPage(url, name) {
  let urlCss = url.replace("pages", "css").replace(".html", ".css");

  let body = await cargarRecurso(url);
  cargarCss(urlCss);
  main.innerHTML = body;

  history.pushState({ templateHtml: body, urlCss }, "", name);
  estadoActual = estados[name];
  urlActual = url;
  verificarEstadoActual();
}

function verificarEstadoActual() {
  if (estadoActual == estados.principal) {
  }
  if (estadoActual == estados.cursos) {
    links = main.querySelectorAll("a");
    setearLinks(links);
  }
  if (estadoActual == estados.curso) {
    let desplegables = Array.from(document.getElementsByClassName("desplegable__clases"));
    desplegables.forEach((desplegable) => {
      addEventListenerWithCheck(desplegable, "click", () => mostrarElementos("mostrar-clases"));
    });

    desplegables = Array.from(document.getElementsByClassName("modulo"));
    desplegables.forEach((desplegable) => {
      addEventListenerWithCheck(desplegable, "click", () => mostrarElementos("mostrar-datos"));
    });
  }
  if (estadoActual == estados.pago) {
    addEventListenerWithCheck(document, "click", (e) => mostrarCalendario(e));
  }
  if (estadoActual == estados.perfil) {
  }
  if (estadoActual == estados.contacto) {
  }
}

function setearLinks(links) {
  links.forEach((link) => {
    addEventListenerWithCheck(link, "click", async (e) => {
      e.preventDefault();
      let name = link.dataset.name;
      setPage(link.href, name);
    });
  });
}

window.addEventListener("popstate", (e) => {
  let estado = e.state;
  if (estado.templateHtml) {
    main.innerHTML = estado.templateHtml;
    cargarCss(estado.urlCss);
  } else {
    let path = location.pathname + ".html";
    console.log(path);
    let body = cargarRecurso(path);
    main.innerHTML = body;
    history.pushState({ template: body }, "", name);
  }
});

// window.addEventListener("loadstart", (e) => {
//   e.preventDefault();
//   e.stopPropagation();
//   console.log(urlActual, estadoActual);
//   setPage(urlActual, estadoActual);
// });

function mostrarCalendario(event) {
  let celda = event.target;
  if (!celda.classList.contains("celda-dia")) {
    celda = celda.closest(".celda-dia");
  }
  if (!celda) {
    return;
  }
  celda.classList.toggle("dia-seleccionado");
}

function mostrarElementos(clase) {
  desplegable.classList.toggle(clase);
}

// Función para verificar si un EventListener con nombre está asignado a un elemento
function hasEventListener(elemento, eventName, handler) {
  const eventListeners = elemento._eventListeners;
  if (!eventListeners || !eventListeners[eventName]) {
    return false;
  }
  return eventListeners[eventName].includes(handler);
}

// Función para agregar un EventListener con nombre a un elemento
function addEventListenerWithCheck(elemento, eventName, handler) {
  if (!hasEventListener(elemento, eventName, handler)) {
    elemento.addEventListener(eventName, handler);
  }
}

// Función para eliminar un EventListener con nombre de un elemento
function removeEventListenerWithCheck(elemento, eventName, handler) {
  if (hasEventListener(elemento, eventName, handler)) {
    elemento.removeEventListener(eventName, handler);
  }
}
