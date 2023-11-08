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
const jsPaginaActual = document.getElementById("jsPaginaActual");
let htmlTemplates = new Map();
const main = document.querySelector("main");
let paginaActual = "";
let urlActual = "";
let isLoggedIn = false;

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

  cargarPagina(url, name);
});

window.addEventListener("popstate", (e) => {
  let estado = e.state;
  if (estado.body) {
    animarCargar(estado.body, estado.urlCss, estado.urlJs);
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

async function setJs(urlJs) {
  let jsInit = await import(urlJs);
  jsInit.iniciar();
}

function setHtmlBody(body) {
  main.innerHTML = body;
}

async function cargarPagina(urlHtml, name) {
  if (estaCargado(name)) {
    cargarPaginaGuardada(htmlTemplates.get(name));
  } else {
    cargarPaginaCompleta(urlHtml, name);
  }
  paginaActual = paginas[name];
  urlActual = name;
}

async function cargarPaginaCompleta(urlHtml, name) {
  let urlCss = urlHtml.replace(".html", ".css");
  let urlJs = urlHtml.replace(".html", ".js");
  let body = await cargarHtml(urlHtml);
  animarCargar(body, urlCss, urlJs);
  agregarState(name, urlHtml, body, urlCss, urlJs);
  pushStateHistory(name);
}

async function cargarPaginaGuardada(datos) {
  animarCargar(datos.body, datos.urlCss, datos.urlJs);
  pushStateHistory(datos.name);
}

async function retrocederPaginaGuardada(body, urlCss, urlJs) {
  animarCargar(body, urlCss, urlJs);
}

function agregarState(name, urlHtml, body, urlCss, urlJs) {
  htmlTemplates.set(name, { name, urlHtml, body, urlCss, urlJs });
}

function pushStateHistory(name) {
  history.pushState(htmlTemplates.get(name), "", name);
}

function animarCargar(body, urlCss, urlJS) {
  main.classList.add("animacion-salida");
  setTimeout(() => {
    setHtmlBody(body);
    setCss(urlCss);
    setJs(urlJS);
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

const openModalButton = document.getElementById("openModal");
const loginModal = document.getElementById("loginModal");
const userMenuModal = document.getElementById("userMenuModal");
// Mostrar el modal al hacer clic en el enlace (Login o Menú de usuario logueado)
openModalButton.addEventListener("click", function () {
  if (isLoggedIn) {
    // Si el usuario está logueado, cierra el modal si ya está abierto
    if (userMenuModal.style.display === "block") {
      userMenuModal.style.display = "none";
    } else {
      // Si no está abierto, ábrelo
      userMenuModal.style.display = "block";
    }
  } else {
    // Si el usuario no está logueado, abre el modal de inicio de sesión
    loginModal.style.display = "block";
  }
});

// Cerrar el modal al hacer clic en el botón de cerrar (x)
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "none";
  // También puedes ocultar el menú de usuario logueado si se muestra
  document.getElementById("userMenuModal").style.display = "none";
});

// Cerrar el modal al hacer clic en cualquier área fuera del modal
window.addEventListener("click", function (event) {
  var modal = document.getElementById("loginModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.getElementById("viewProfile").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = "perfil";
  const url = pages[name];

  cargarPagina(url, name);
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
      },
    });

    if (response.ok) {
      const userData = await response.json();
      const authorizationHeader = response.headers.get("Authorization");
      const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
      console.log(userData.message); // Mensaje de éxito

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);

      if (userData.user) {
        localStorage.setItem("user", JSON.stringify(userData.user));
      }

      document.getElementById("loginModal").style.display = "none";
      document.getElementById("login-form").reset();
      isLoggedIn = true;

      const button = document.getElementById("openModal");
      button.innerHTML = `<img class="login__image" src="./assets/images/integrantes/integrante-foto-1.png" alt="User Profile" class="profile-image">`;
    } else {
      if (response.status === 401) {
        document.getElementById("error-message").textContent =
          "Credentials are not valid. Please try again.";
      }
    }
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("logout").addEventListener("click", logout);

function logout() {
  // Elimina el token del localStorage
  localStorage.removeItem("token");

  // Restaura la imagen de perfil por defecto
  openModalButton.innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>`;

  // Cierra el modal si está abierto
  const userMenuModal = document.getElementById("userMenuModal");
  userMenuModal.style.display = "none";
  isLoggedIn = false;
  cargarPaginaGuardada(htmlTemplates.get(paginas.principal));
}
