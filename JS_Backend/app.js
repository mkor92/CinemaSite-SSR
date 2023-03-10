import express from "express";
import { marked } from "marked";
import { loadMovie, loadMovies } from "./movies.js";

let headerMenu = [
  {
    label: "Hem",
    link: "/",
  },
  {
    label: "Om oss",
    link: "/about",
  },
  {
    label: "Biljettinfo",
    link: "/UC",
  },
  {
    label: "Presentkort",
    link: "/UC",
  },
];

const app = express();
app.set("view engine", "ejs");

function menuWithActive(items, path) {
  return items.map((item) => ({
    active: item.link == path,
    ...item,
  }));
}

app.get("/movies", async (req, res) => {
  const movies = await loadMovies();

  res.render("movies", {
    headerMenu: headerMenu,
    movies,
    movieHeader: "Alla filmer",
  });
});

app.get("/movies/:movieId", async (req, res) => {
  const movie = await loadMovie(req.params.movieId);
  if (movie) {
    res.render("movie-info", {
      headerMenu: headerMenu,
      movie,
      title: movie.attributes.title,
      intro: marked.parseInline(movie.attributes.intro),
      image: movie.attributes.image.url,
    });
  } else {
    res.status(404).render("404", {
      headerMenu: headerMenu,
    });
  }
});

app.get("/", async (req, res) => {
  const movies = await loadMovies();
  let moviesArray = movies.slice(0, 8);
  if (movies.length > 8) {
    res.render("index", {
      headerMenu: menuWithActive(headerMenu, "/"),
      movies: moviesArray,
      movieHeader: "På bion just nu",
      movieImage0: movies[0].attributes.image.url,
      movieTitle0: movies[0].attributes.title,
      movieImage1: movies[1].attributes.image.url,
      movieTitle1: movies[1].attributes.title,
      movieImage2: movies[2].attributes.image.url,
      movieTitle2: movies[2].attributes.title,
      movieImage3: movies[3].attributes.image.url,
      movieTitle3: movies[3].attributes.title,
    });
  } else {
    res.render("index", {
      headerMenu: menuWithActive(headerMenu, "/"),
      movies,
      movieHeader: "På bion just nu",
      movieImage0: movies[0].attributes.image.url,
      movieTitle0: movies[0].attributes.title,
      movieImage1: movies[1].attributes.image.url,
      movieTitle1: movies[1].attributes.title,
      movieImage2: movies[2].attributes.image.url,
      movieTitle2: movies[2].attributes.title,
      movieImage3: movies[3].attributes.image.url,
      movieTitle3: movies[3].attributes.title,
    });
  }
});

app.get("/salons", (req, res) => {
  res.render("salons", {
    headerMenu: headerMenu,
  });
});

app.get("/about", (req, res) => {
  res.render("about-us", {
    headerMenu: menuWithActive(headerMenu, "/about"),
  });
});

app.get("/events", (req, res) => {
  res.render("events", {
    headerMenu: headerMenu,
  });
});

app.get("/restaurant", async (req, res) => {
  const movies = await loadMovies();
  res.render("restaurant", {
    headerMenu: headerMenu,
    movieImage0: movies[0].attributes.image.url,
    movieTitle0: movies[0].attributes.title,
    movieImage1: movies[1].attributes.image.url,
    movieTitle1: movies[1].attributes.title,
    movieImage2: movies[2].attributes.image.url,
    movieTitle2: movies[2].attributes.title,
    movieImage3: movies[3].attributes.image.url,
    movieTitle3: movies[3].attributes.title,
  });
});

app.get("/salon-a", (req, res) => {
  res.render("salonA", {
    headerMenu: headerMenu,
  });
});

app.get("/salon-b", (req, res) => {
  res.render("salonB", {
    headerMenu: headerMenu,
  });
});

app.get("/UC", (req, res) => {
  res.render("under-construction", {
    headerMenu: headerMenu,
  });
});

app.get("/booking", (req, res) => {
  res.render("booking", {
    headerMenu: headerMenu,
  });
});

app.use("/static", express.static("./static"));
app.use("/src", express.static("./src"));

export default app;
