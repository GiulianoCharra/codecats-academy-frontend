import { carrusel } from "./js/carrusel.js";
import { buscador } from "./js/buscador.js";
import { desplegable } from "./js/desplegable.js";
import { pages } from "./rutas";

const paginas = {
  principal: "principal",
  cursos: "cursos",
  curso: "curso",
  pago: "pago",
  perfil: "perfil",
  contacto: "contacto",
};

const cssPaginaActual = document.getElementById("cssPaginaActual");
let htmlTemplates = new Map();
const main = document.querySelector("main");
let paginaActual = "";
let urlActual = "";

buscador();
desplegable();

window.addEventListener("DOMContentLoaded", () => {
  paginaActual = location.pathname.split("/");
  paginaActual = paginaActual[paginaActual.length - 1];
  if (!paginaActual) {
    paginaActual = paginas.principal;
  }
  urlActual = `./pages/${paginaActual}.html`;
  cargarPagina(urlActual, paginaActual);
});

addEventListenerWithCheck(document, "click", async (e) => {
  const link = e.target.closest("a");
  if (!link) {
    return;
  }
  e.preventDefault();
  let name = link.dataset.name;
  let url = link.href;
  if (pages[name]) {
    main.innerHTML = pages[name];
  }

  /* if (estaCargado(name)) {
    cargarPaginaGuardada(htmlTemplates.get(name));
  } else {
    cargarPagina(url, name);
  } */
});

window.addEventListener("popstate", (e) => {
  let estado = e.state;
  if (estado.body) {
    animarCargar(estado.body, estado.urlCss);
  }
});

function estaCargado(name) {
  return htmlTemplates.get(name);
}

async function cargarHtml(url) {
  const res = await fetch(url);
  return await res.text();
}

function setCss(urlCss) {
  cssPaginaActual.href = urlCss;
}

function setHtmlBody(body) {
  main.innerHTML = body;
}

async function cargarPagina(datos) {
  if (datos) {
    cargarPaginaGuardada(datos);
  } else {
    cargarPaginaCompleta(datos.urlHtml, datos.name);
  }
  paginaActual = paginas[datos.name];
  urlActual = urlHtml;
}

async function cargarPaginaCompleta(urlHtml, name) {
  let urlCss = url.replace("pages", "css").replace(".html", ".css");
  let body = await cargarHtml(urlHtml);
  animarCargar(body, urlCss);
  agregarState(name, urlHtml, body, urlCss);
  pushStateHistory(name);
}

async function cargarPaginaGuardada(datos) {
  animarCargar(datos.body, datos.urlCss);
  pushStateHistory(datos.name);
}

async function retrocederPaginaGuardada(body, urlCss) {
  animarCargar(body, urlCss);
}

function agregarState(name, urlHtml, body, urlCss) {
  htmlTemplates.set(name, { name, urlHtml, body, urlCss });
}

function pushStateHistory(name) {
  history.pushState(htmlTemplates.get(name), "", name);
}

function animarCargar(body, urlCss) {
  main.classList.add("animacion-salida");
  setTimeout(() => {
    setHtmlBody(body);
    setCss(urlCss);
    verificarEstadoActual();

    main.classList.add("animacion-entrada");
    main.classList.remove("animacion-salida");
    setTimeout(() => {
      main.classList.remove("animacion-entrada");
    }, 200);
  }, 250);
}

function verificarEstadoActual() {
  if (paginaActual == paginas.principal) {
    let listadoIntegrantes = document.querySelector(".listado-integrantes");
    carrusel(listadoIntegrantes);
  }
  if (paginaActual == paginas.cursos) {
  }
  if (paginaActual == paginas.curso) {
    let desplegables = Array.from(document.getElementsByClassName("desplegable__clases"));
    desplegables.forEach((desplegable) => {
      addEventListenerWithCheck(desplegable, "click", () => mostrarElementos("mostrar-clases"));
    });

    desplegables = Array.from(document.getElementsByClassName("modulo"));
    desplegables.forEach((desplegable) => {
      addEventListenerWithCheck(desplegable, "click", () => mostrarElementos("mostrar-datos"));
    });
  }
  if (paginaActual == paginas.pago) {
    addEventListenerWithCheck(document, "click", (e) => mostrarCalendario(e));
  }
  if (paginaActual == paginas.perfil) {
  }
  if (paginaActual == paginas.contacto) {
  }
}

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
