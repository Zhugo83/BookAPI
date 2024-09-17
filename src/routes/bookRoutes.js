const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/auth');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getOneBook);
router.post('/add', authMiddleware, bookController.createBook);
router.patch('/update/:id', bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;