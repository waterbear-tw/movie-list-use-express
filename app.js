const express = require("express");
const app = express();
const hostname = "localhost";
const port = 3000;

const movieList = require("./moviesList.json");
//require express-handlebars here
const exphbs = require("express-handlebars");

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" })); //設定一叫做handlebars的引擎，並並設定在DeafautLayout的設定檔名稱
app.set("view engine", "handlebars"); //告訴 Express 說要設定的 view engine 是 handlebars

// setting static files
app.use(express.static("public")); //Express 靜態檔案是放在名為 public 的資料夾中

const server = app.get("/", (req, res) => {
  res.render("index", { movies: movieList.results });
});

app.get("/search", (req, res) => {
  console.log(req.query.keyword);
  const movies = movieList.results.filter((movie) =>
    movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  );
  console.log(movies);
  res.render("index", { movies: movies, keyword: req.query.keyword });
});

app.get("/movies/:movie_id", (req, res) => {
  const movie_filtered = movieList.results.find(
    (movie) => movie.id.toString() === req.params.movie_id
  );
  res.render("show", { movie: movie_filtered });
});

// app.get("");
server.listen(port, hostname, () => {
  console.log(`the server is on`);
});
