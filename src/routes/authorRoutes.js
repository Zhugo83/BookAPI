const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getOneAuthor);
router.post('/add', authorController.createAuthor);
router.patch('/update/:id', authorController.updateAuthor);
router.delete('/delete/:id', authorController.deleteAuthor);

module.exports = router;