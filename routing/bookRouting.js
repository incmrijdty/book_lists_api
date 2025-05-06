
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// External API search
router.get('/search', bookController.searchBooks);

// User book list
router.get('/', bookController.getHomeView);
router.post('/', bookController.addBookToUserList);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
