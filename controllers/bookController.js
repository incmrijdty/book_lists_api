const axios = require('axios');
const Book = require('../models/bookModel');
const GOOGLE_API_KEY = 'AIzaSyDnIPEnZ-IFH12AqKF3_lBdzmGjWIkgDoc'; // Replace with actual key
const { STATUS_CODE } = require("../constants/statusCode");
// 🔍 Search books from Google Books
exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Missing search query' });

  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q,
        key: GOOGLE_API_KEY,
        maxResults: 10
      }
    });

    const books = (response.data.items || []).map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description || '',
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
    }));

    res.json(books);
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER).json({ message: 'Failed to fetch books', error: error.message });
  }
};

// 📋 Get all books from user list
exports.getUserBooks = (req, res) => {
  res.json(Book.getAll());
};

// ➕ Add a book to user list
exports.addBookToUserList = (req, res) => {
  const { id, title, authors, thumbnail } = req.body;

  if (!id || !title)
    return res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Book ID and title are required' });

  const added = Book.add({ id, title, authors, thumbnail });
  if (!added) return res.status(STATUS_CODE.CONFLICT).json({ message: 'Book already in list' });

  res.status(STATUS_CODE.OK).json(added);
};

// ❌ Delete from user list
exports.deleteBook = (req, res) => {
  const deleted = Book.remove(req.params.id);
  if (!deleted) return res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Book not found in list' });
  res.json(deleted);
};

exports.getHomeView = (req, res) => {
    
    res.render("bookHomePage.ejs", {
      headTitle: "Home",
      path: "/",
    });
  };
