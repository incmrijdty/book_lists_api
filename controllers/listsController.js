//const axios = require('axios');
const Book = require('../models/bookModel');
//const GOOGLE_API_KEY = 'AIzaSyDnIPEnZ-IFH12AqKF3_lBdzmGjWIkgDoc'; 
const { STATUS_CODE } = require("../constants/statusCode");
const List = require("../models/listModel");
const { MENU_LINKS } = require("../constants/navigation");

exports.getListsView = (req, res) => {
  const savedBooks = Book.getAll();
  const savedLists = List.getAll();
    res.render("listsPage.ejs", {
      headTitle: "Your Lists",
      path: "/lists",
      activeLinkPath: '/lists',
      menuLinks: MENU_LINKS,
      savedBooks,
      savedLists,
    });
    // several authors
  };

exports.createNewList = (req, res) => {
  const newList = new List(req.body.name);
  List.add(newList);

  res.redirect("/lists");

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