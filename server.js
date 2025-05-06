const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const bookRoutes = require("./routing/bookRouting");

const app = express();

//app.set("view engine", "ejs");
//app.set("views", "views");
app.use(express.json());
//app.use(express.static(getFileFromAbsolutePath("public")));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/books", bookRoutes);
app.use("/", bookRoutes);
//app.get('/', (req, res) => {
//    res.send('API is running. Try /books/search?q=yourquery');
//  });

app.listen(PORT);
