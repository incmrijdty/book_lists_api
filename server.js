const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config");
const bookRoutes = require("./routing/bookRouting");
const listsRoutes = require("./routing/listsRouting");
const getFileFromAbsolutePath = require("./utils/getFileFromAbsolutePath");
const logger = require("./utils/logger");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");


app.use(express.static(getFileFromAbsolutePath("public")));

app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form submissions

app.use((request, _response, next) => {
    const { url, method } = request;
  
    logger.getInfoLog(url, method);
    next();
  });

app.use("/", bookRoutes);
app.use("/lists", listsRoutes); 

app.use((request, response) => {
    const { url } = request;
  
    response.status(STATUS_CODE.NOT_FOUND).render("404.ejs", {
      headTitle: "404",
      menuLinks: MENU_LINKS,
      activeLinkPath: "",
    });
    logger.getErrorLog(url);
  });


app.listen(PORT);
