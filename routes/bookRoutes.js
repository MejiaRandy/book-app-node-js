const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' });

router.get('/', bookController.listBooks);

router.get('/create', bookController.createBookForm);

router.post('/create', upload.single('coverImage'), bookController.createBook);

router.get('/edit/:id', bookController.editBookForm);

router.post('/edit/:id', upload.single('coverImage'), bookController.editBook);

router.get('/delete/:id', bookController.deleteBook);

module.exports = router;
