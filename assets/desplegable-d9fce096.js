document.addEventListener("click",function(l){let e=l.target;if(e.classList.contains("desplegable_select")||(e=e.closest(".desplegable_select")),!e)return;e.classList.toggle("mostrar-opciones"),Array.from(document.getElementsByClassName("desplegable_select")).filter(s=>s!==e).forEach(s=>{s.classList.remove("mostrar-opciones")})});