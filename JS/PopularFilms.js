import { Server } from "./ServerApi.js";

export class PopularFilms extends Server {
  constructor(key) {
    super(key);
  }

  async dataApi() {
    const responseApi = await this.serverApi();
    this.createHtml(responseApi);
  }

  createHtml(api) {
    const containerHtml = document.querySelector(".popular-films");
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
          data.description.slice(0, 100) + "..."
        }</p>
       </div>
    </li>
    `
      )
      .join("");
  }
}
const popularFilms = new PopularFilms("c3d3d4f8-894c-491b-95cd-70c4a7f35283");
popularFilms.dataApi();
