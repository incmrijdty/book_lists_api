
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


router.get('/search', bookController.searchBooks);


router.get('/', bookController.getHomeView);
router.post('/', bookController.addBookToUserList);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
