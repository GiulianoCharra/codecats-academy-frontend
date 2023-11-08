import view from "./curso.html";
import style from "./curso.css";


export default () => {
  return (document.createElement("div").innerHTML = view);
};
