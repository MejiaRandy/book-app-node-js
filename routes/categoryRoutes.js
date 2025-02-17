// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


router.get('/', categoryController.listCategories);


router.get('/create', categoryController.createCategoryForm);


router.post('/create', categoryController.createCategory);


router.get('/edit/:id', categoryController.editCategoryForm);


router.post('/edit/:id', categoryController.editCategory);

router.get('/delete/:id', categoryController.deleteCategory);

module.exports = router;
