const Book = require('../models/bookModel');
const { STATUS_CODE } = require("../constants/statusCode");
const List = require("../models/listModel");
const { MENU_LINKS } = require("../constants/navigation");

exports.getListsView = (req, res) => {
  const savedBooks = Book.getAll();
  
  const favouritesList = new List("Favourites");
  const readList = new List("Read");
  const toBeReadList = new List("To Be Read");

  const savedLists = List.getAll();

  

    res.render("listsPage.ejs", {
      headTitle: "Your Lists",
      path: "/lists",
      activeLinkPath: '/lists',
      menuLinks: MENU_LINKS,
      savedBooks,
      favouritesList,
      readList,
      toBeReadList,
      savedLists,
    });
    // several authors
  };

exports.createNewList = (req, res) => {
  const newList = new List(req.body.name);
  List.add(newList);

  res.status(STATUS_CODE.FOUND).redirect("/lists");

  //cancl button doesnt work
};


exports.getListView = (request, response) => {
  const name = request.params.name;
  const list = List.findByName(name);

  response.render("list.ejs", {
    headTitle: "List",
    path: `/lists/${name}`,
    activeLinkPath: `/lists/${name}`,
    menuLinks: MENU_LINKS,
    list,
  });
};