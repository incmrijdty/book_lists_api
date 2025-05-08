const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const bookRoutes = require("./routing/bookRouting");
const listsRoutes = require("./routing/listsRouting");
const getFileFromAbsolutePath = require("./utils/getFileFromAbsolutePath");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());

app.use(express.static(getFileFromAbsolutePath("public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", bookRoutes);
app.use("/lists", listsRoutes); 


app.listen(PORT);
