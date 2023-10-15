import view from "./principal.html";
import style from "./principal.css";

export default () => {
  return (document.createElement("div").innerHTML = view);
};
