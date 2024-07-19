// routes/authorRoutes.js
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// List all authors
router.get('/', authorController.listAuthors);

// Form to create a new author
router.get('/create', authorController.createAuthorForm);

// Create a new author
router.post('/create', authorController.createAuthor);

// Form to edit an author
router.get('/edit/:id', authorController.editAuthorForm);

// Edit an author
router.post('/edit/:id', authorController.editAuthor);

// Delete an author
router.get('/delete/:id', authorController.deleteAuthor);

module.exports = router;
