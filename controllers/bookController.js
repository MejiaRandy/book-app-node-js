const { Book, Category, Author, Publisher } = require('../models');
const nodemailer = require('nodemailer');

exports.listBooks = async (req, res) => {
    try {
        const books = await Book.findAll({ include: [Category, Author, Publisher] });
        res.render('books/index', { books });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createBookForm = async (req, res) => {
    try {
        const categories = await Category.findAll();
        const authors = await Author.findAll();
        const publishers = await Publisher.findAll();
        res.render('books/create', { categories, authors, publishers });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, publicationYear, categoryId, authorId, publisherId } = req.body;
        const coverImage = req.file.filename;
        const book = await Book.create({ title, publicationYear, coverImage, categoryId, authorId, publisherId });

        const author = await Author.findByPk(authorId);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: author.email,
            subject: 'New Book Published',
            text: `A new book titled "${book.title}" has been published under your name.`
        };

        await transporter.sendMail(mailOptions);

        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.editBookForm = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        const categories = await Category.findAll();
        const authors = await Author.findAll();
        const publishers = await Publisher.findAll();
        res.render('books/edit', { book, categories, authors, publishers });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.editBook = async (req, res) => {
    try {
        const { title, publicationYear, categoryId, authorId, publisherId } = req.body;
        const coverImage = req.file ? req.file.filename : req.body.existingCoverImage;
        await Book.update({ title, publicationYear, coverImage, categoryId, authorId, publisherId }, {
            where: { id: req.params.id }
        });
        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.destroy({ where: { id: req.params.id } });
        res.redirect('/books');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
