import { FiltersFilm } from "./ServerApi.js";

export class FilterFilms extends FiltersFilm {
  constructor(key, url) {
    super(key, url);
  }

  async dataApi() {
    const responseApi = await this.filters("", "", "");
    this.createFilerHtml(responseApi);
  }

  initFilters() {
    this.filterFunc(this.createFilerHtml.bind(this));
  }

  createFilerHtml(api) {
    const containerHtml = document.querySelector(".filters-films");
    containerHtml.innerHTML = api
      .map(
        (data) => `
     <li class="popular-film">
       <img
         class="popular-film--img"
         src="${data.posterUrl}"
         alt="${data.nameRu}"
       />
       <div class="popular-film--content">
         <p class="popular-film--title">${data.nameRu}</p>
         <div class="block-popular-film">
           <p class="block-popular--year">${
             data.year === null ? "Нету" : data.year
           }</p>
           <span class="block-popular--tag">${data.genres[0].genre}</span>
         </div>
         <span class="popular-film--rating">${
           data.ratingImdb === null ? "0.0" : data.ratingImdb
         }</span>
        <p class="popular-film--description">${
          data.description
            ? data.description.slice(0, 100) + "..."
            : "К сожалению, подробное описание данного фильма в настоящее время недоступно в нашей базе данных. Возможно, информация находится в процессе обновления или временно отсутствует по техническим причинам."
        }</p>
       </div>
    </li>
    `
      )
      .join("");
  }
}

const filterFilm = new FilterFilms(
  "c3d3d4f8-894c-491b-95cd-70c4a7f35283",
  "https://kinopoiskapiunofficial.tech/api/v2.2/films"
);
filterFilm.dataApi();
filterFilm.initFilters();
