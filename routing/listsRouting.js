
const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');


router.get('/', listsController.getListsView);
router.post("/add-list", listsController.createNewList);
router.get("/:name", listsController.getListView);

module.exports = router;
