import view from "./cursos.html";
import style from "./cursos.css";


export default () => {
  return (document.createElement("div").innerHTML = view);
};
