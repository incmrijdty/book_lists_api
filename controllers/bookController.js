const axios = require('axios');
const GOOGLE_API_KEY = 'AIzaSyDnIPEnZ-IFH12AqKF3_lBdzmGjWIkgDoc'; 
const { STATUS_CODE } = require("../constants/statusCode");
const { MENU_LINKS } = require('../constants/navigation');
const List = require('../models/listModel');

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(STATUS_CODE.NOT_FOUND).render("404.ejs", {
    headTitle: "404",
    activeLinkPath: '', 
    menuLinks: MENU_LINKS,
  });

  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q,
        key: GOOGLE_API_KEY,
        maxResults: 40
      }
    });

    const books = (response.data.items || []).map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || '',
      // to add: no authors/unknown
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
    }));
    const savedBooks = List.getAll();
    res.render('search.ejs', {
      books,
      query: q,
      menuLinks: MENU_LINKS,
      activeLinkPath: "/search",
      savedBooks,
    });

    //to add: no results found

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(STATUS_CODE.INTERNAL_SERVER).json({ message: 'Failed to fetch books', error: error.message });
  }
};

exports.getHomeView = (req, res) => {
    
    res.render("bookHomePage.ejs", {
      headTitle: "Home",
      path: "/",
      activeLinkPath: '/', 
      menuLinks: MENU_LINKS,
    });
  };
