import { carrusel } from "./js/carrusel.js";
import { buscador } from "./js/buscador.js";
import { desplegable } from "./js/desplegable.js";

const paginas = {
  principal: "principal",
  cursos: "cursos",
  curso: "curso",
  pago: "pago",
  perfil: "perfil",
  contacto: "contacto",
};

const pages = {
  principal: "./pages/principal/principal.html",
  cursos: "./pages/cursos/cursos.html",
  curso: "./pages/curso/curso.html",
  pago: "./pages/pago/pago.html",
  contacto: "./pages/contacto/contacto.html",
  perfil: "./pages/perfil/perfil.html",
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
  if (paginaActual == "index.html" || paginaActual == "") {
    paginaActual = paginas.principal;
  }
  urlActual = pages[paginaActual];
  cargarPagina(urlActual, paginaActual);
});

addEventListenerWithCheck(document, "click", async (e) => {
  const link = e.target.closest("a");
  if (!link) {
    return;
  }
  e.preventDefault();
  let name = link.dataset.name;
  let url = pages[name];
  if (pages[name]) {
    main.innerHTML = pages[name];
  }

  if (estaCargado(name)) {
    cargarPaginaGuardada(htmlTemplates.get(name));
  } else {
    cargarPagina(url, name);
  }
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

async function cargarPagina(urlHtml, name) {
  if (estaCargado(name)) {
    cargarPaginaGuardada(urlHtml);
  } else {
    cargarPaginaCompleta(urlHtml, name);
  }
  paginaActual = paginas[name];
  urlActual = name;
}

async function cargarPaginaCompleta(urlHtml, name) {
  let urlCss = urlHtml.replace(".html", ".css");
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
      addEventListenerWithCheck(desplegable, "click", () =>
        mostrarElementos(desplegable, "mostrar-clases")
      );
    });

    desplegables = Array.from(document.getElementsByClassName("modulo"));
    desplegables.forEach((desplegable) => {
      addEventListenerWithCheck(desplegable, "click", () =>
        mostrarElementos(desplegable, "mostrar-datos")
      );
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

function mostrarElementos(desplegable, clase) {
  desplegable.classList.toggle(clase);
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

// Mostrar el modal al hacer clic en el enlace
document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "block";
});

// Cerrar el modal al hacer clic en el botón de cerrar (x)
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "none";
});

// Cerrar el modal al hacer clic en cualquier área fuera del modal
window.addEventListener("click", function (event) {
  var modal = document.getElementById("loginModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let url = "https://codecats-academy-backend.onrender.com/api/auth/login";
  let data = {
    email,
    password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",

        // Agrega las cabeceras para sortear CORS
        "Access-Control-Allow-Origin": "*",
      },
    });

    if (response.ok) {
      const userData = await response.json();

      console.log(response);
      const authorizationHeader = response.headers.get("Authorization");
      const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
      console.log(userData.message); // Mensaje de éxito

      if (!token) {
        throw new Error("Token no encontrado en la respuesta");
      }

      localStorage.setItem("token", token);

      if (userData.user) {
        localStorage.setItem("user", JSON.stringify(userData.user));
      }

      window.location.href = "http://localhost:3000/"; // O la URL que desees
    } else {
      throw new Error("Error en la petición");
    }
  } catch (error) {
    console.log(error);
  }
});
