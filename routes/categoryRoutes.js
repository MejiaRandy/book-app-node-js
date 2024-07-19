// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// List all categories
router.get('/', categoryController.listCategories);

// Form to create a new category
router.get('/create', categoryController.createCategoryForm);

// Create a new category
router.post('/create', categoryController.createCategory);

// Form to edit a category
router.get('/edit/:id', categoryController.editCategoryForm);

// Edit a category
router.post('/edit/:id', categoryController.editCategory);

// Delete a category
router.get('/delete/:id', categoryController.deleteCategory);

module.exports = router;
