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
let htmlTemplates = new Map();
const main = document.querySelector("main");
let paginaActual = "";
let urlActual = "";

buscador();
desplegable();

window.addEventListener("DOMContentLoaded", () => {
  paginaActual = location.pathname.split("/");
  paginaActual = paginaActual[paginaActual.length - 1];
  urlActual = `./pages/${paginaActual}.html`;
  setPage(urlActual, paginaActual);
});

addEventListenerWithCheck(document, "click", async (e) => {
  console.log(htmlTemplates);
  const link = e.target.closest("a");
  if (!link) {
    return;
  }
  e.preventDefault();
  let name = link.dataset.name;
  if (htmlTemplates.get(name)) {
    animarCargar(htmlTemplates.get(name).body, htmlTemplates.get(name).urlCss);
  } else {
    setPage(link.href, name);
  }
});

window.addEventListener("popstate", (e) => {
  let estado = e.state;
  if (estado.templateHtml) {
    animarCargar(estado.templateHtml, estado.urlCss);
  } else {
    let path = location.pathname + ".html";
    console.log(path);
    let body = cargarRecurso(path);
    main.innerHTML = body;
    history.pushState({ template: body }, "", name);
  }
});

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
  animarCargar(body, urlCss);

  if (!htmlTemplates[name]) {
    htmlTemplates.set(name, { body, urlCss });
  }

  history.pushState({ templateHtml: body, urlCss }, "", name);
  paginaActual = estados[name];
  urlActual = url;
}

function animarCargar(body, urlCss) {
  main.classList.add("animacion-salida");
  setTimeout(() => {
    main.innerHTML = body;
    cargarCss(urlCss);
    verificarEstadoActual();

    main.classList.add("animacion-entrada");
    main.classList.remove("animacion-salida");
    setTimeout(() => {
      main.classList.remove("animacion-entrada");
    }, 200);
  }, 200);
}

function verificarEstadoActual() {
  if (paginaActual == estados.principal) {
    let listadoIntegrantes = document.querySelector(".listado-integrantes");
    carrusel(listadoIntegrantes);
  }
  if (paginaActual == estados.cursos) {
  }
  if (paginaActual == estados.curso) {
    let desplegables = Array.from(document.getElementsByClassName("desplegable__clases"));
    desplegables.forEach((desplegable) => {
      addEventListenerWithCheck(desplegable, "click", () => mostrarElementos("mostrar-clases"));
    });

    desplegables = Array.from(document.getElementsByClassName("modulo"));
    desplegables.forEach((desplegable) => {
      addEventListenerWithCheck(desplegable, "click", () => mostrarElementos("mostrar-datos"));
    });
  }
  if (paginaActual == estados.pago) {
    addEventListenerWithCheck(document, "click", (e) => mostrarCalendario(e));
  }
  if (paginaActual == estados.perfil) {
  }
  if (paginaActual == estados.contacto) {
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
