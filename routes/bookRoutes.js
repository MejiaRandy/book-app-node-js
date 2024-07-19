// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' });

// List all books
router.get('/', bookController.listBooks);

// Form to create a new book
router.get('/create', bookController.createBookForm);

// Create a new book
router.post('/create', upload.single('coverImage'), bookController.createBook);

// Form to edit a book
router.get('/edit/:id', bookController.editBookForm);

// Edit a book
router.post('/edit/:id', upload.single('coverImage'), bookController.editBook);

// Delete a book
router.get('/delete/:id', bookController.deleteBook);

module.exports = router;
