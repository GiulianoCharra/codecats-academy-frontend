import"./buscador-a79ccb57.js";const r=document.querySelector(".listado_integrantes");let l=s();function i(){r.scrollBy({left:300,behavior:"smooth"}),Array.from(document.getElementsByClassName("integrante")).forEach(t=>{c(t)}),console.log("")}setInterval(i,5e3);function s(){return window.innerWidth/2}window.addEventListener("resize",()=>{let e=s();console.log(e)});function c(e){document.getElementsByClassName("card");let t=e.offsetLeft,o=e.clientWidth/2,n=l-o,a=l+o;t>n&t<a?e.classList.add("hover-activo"):e.classList.remove("hover-activo"),console.log(e),console.log(t,o,l,n,a)}