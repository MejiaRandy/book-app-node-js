// controllers/authorController.js
const { Author, Book } = require('../models');

// List all authors
exports.listAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll({
            include: {
                model: Book,
                attributes: ['id']
            }
        });
        res.render('authors/index', { authors });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Render form to create a new author
exports.createAuthorForm = (req, res) => {
    res.render('authors/create');
};

// Create a new author
exports.createAuthor = async (req, res) => {
    try {
        const { name, email } = req.body;
        await Author.create({ name, email });
        res.redirect('/authors');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Render form to edit an author
exports.editAuthorForm = async (req, res) => {
    try {
        const author = await Author.findByPk(req.params.id);
        res.render('authors/edit', { author });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Edit an author
exports.editAuthor = async (req, res) => {
    try {
        const { name, email } = req.body;
        await Author.update({ name, email }, {
            where: { id: req.params.id }
        });
        res.redirect('/authors');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
    try {
        await Author.destroy({ where: { id: req.params.id } });
        res.redirect('/authors');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
