const express = require('express');
const router = express.Router();
const { Book, Category, Author, Publisher } = require('../models');

// Home route: List all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [Category, Author, Publisher]
        });
        res.render('index', { books });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
