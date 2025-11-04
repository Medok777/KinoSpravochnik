import loaders from "./main.js";

export class Server {
  constructor(key) {
    this.key = key;
  }

  async serverApi() {
    const page = 10;
    const randomPage = Math.round(Math.random() * page);
    try {
      const responseApi = await fetch(
        `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${randomPage}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": this.key,
            "Content-Type": "application/json",
          },
        }
      );
      if (!responseApi.ok) {
        alert(`Ошибка сервера: ${responseApi.status}.`);
        throw new Error(`Ошибка сервера: ${responseApi.status}.`);
      } else {
        // Если сервер ответит со статусом OK, loader остановится.
        loaders()
          .then(() => {
            const loaderContainer = document.querySelector(".loader-container");
            loaderContainer.style.display = "none";
          })
          .catch((error) => {
            alert("Всё сломалось :)");
            console.error(error);
          });
      }

      const dataApi = await responseApi.json();
      // console.log(dataApi);
      return dataApi.items;
    } catch (error) {
      console.log(error);
    }
  }
}

const server = new Server("c3d3d4f8-894c-491b-95cd-70c4a7f35283");
server.serverApi();

export class NewFilmsApi extends Server {
  constructor(key, url) {
    super(key);
    this.url = url;
  }

  async newFilmsApi() {
    try {
      const responseApi = await fetch(this.url, {
        method: "GET",
        headers: {
          "X-API-KEY": this.key,
          "Content-Type": "application/json",
        },
      });
      if (!responseApi.ok) {
        alert("Ошибка добавления новых фильмов", responseApi.status);
        throw new Error("Ошибка добавления новых фильмов", responseApi.status);
      }
      const dataApi = await responseApi.json();
      // console.log(dataApi);

      return dataApi.items;
    } catch (error) {
      console.log(error);
    }
  }
}

const newFilm = new NewFilmsApi(
  "c3d3d4f8-894c-491b-95cd-70c4a7f35283",
  `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_ALL&page=${Math.round(
    Math.random() * 20
  )}`
);
newFilm.newFilmsApi();

export class FiltersFilm {
  constructor(key, url) {
    this.key = key;
    this.url = url;
  }

  async filters(select1 = "", select2 = "", select3 = "") {
    const responseApi = await fetch(
      `${this.url}?countries=${select3}&genres=${select1}&yearFrom=${select2}&yearTo=${select2}&page=1`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": this.key,
          "Content-Type": "application/json",
        },
      }
    );
    if (!responseApi.ok) {
      alert("Ошибка фильрации фильмов", responseApi.status);
      throw new Error("Ошибка фильрации фильмов", responseApi.status);
    }

    const dataApi = await responseApi.json();
    console.log(dataApi);
    return dataApi.items;
  }

  filterFunc(createFilerHtml) {
    const selectGenre = document.querySelector("#selectGenre");
    const selectYear = document.querySelector("#selectYear");
    const selectСountry = document.querySelector("#selectСountry");
    const btnFilters = document.querySelector(".apply-filters");
    btnFilters.addEventListener("click", async () => {
      const filtersData = await this.filters(
        selectGenre.value,
        selectYear.value,
        selectСountry.value
      );
      createFilerHtml(filtersData);
    });
  }
}

const filters = new FiltersFilm(
  "c3d3d4f8-894c-491b-95cd-70c4a7f35283",
  `https://kinopoiskapiunofficial.tech/api/v2.2/films`
);
