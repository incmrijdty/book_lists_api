const axios = require('axios');
const Book = require('../models/bookModel');
const GOOGLE_API_KEY = 'AIzaSyDnIPEnZ-IFH12AqKF3_lBdzmGjWIkgDoc'; 
const { STATUS_CODE } = require("../constants/statusCode");

const { MENU_LINKS } = require("../constants/navigation");

exports.getListsView = (req, res) => {
  const savedBooks = Book.getAll();
    res.render("listsPage.ejs", {
      headTitle: "Your Lists",
      path: "/lists",
      activeLinkPath: '/lists',
      menuLinks: MENU_LINKS,
      savedBooks
    });
  };
