import { Server, NewFilmsApi, FiltersFilm } from "./ServerApi.js";
import { FilterFilms } from "./FilterFilms.js";
import { PopularFilms } from "./PopularFilms.js";
import { NewFilms } from "./NewFilms.js";

alert(
  "В настоящее время внешнее API может работать нестабильно: возможны частые ошибки или полная недоступность. Приношу извинения за неудобства."
);
function loaders() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}
export default loaders;
setTimeout(runningLine, 1000);

function runningLine() {
  const LineText = document.querySelector(".recommended-movie--description");
  const lineText =
    "«Побег из Шоушенка» — это история банкира Энди Дюфрейна, несправедливо осужденного за убийство жены и ее любовника, и его многолетнего заключения в тюрьме Шоушенк.";

  let i = 0;
  const typeText = () => {
    if (i < lineText.length) {
      LineText.textContent = lineText.substring(0, i + 1);
      i++;
      setTimeout(typeText, 50);
    }
  };
  typeText();
}
