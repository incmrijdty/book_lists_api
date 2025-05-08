
const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');


//router.get('/search', bookController.searchBooks);


router.get('/', listsController.getListsView);
//router.post('/', bookController.addBookToUserList);
//router.delete('/:id', bookController.deleteBook);

module.exports = router;
