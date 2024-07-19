// controllers/publisherController.js
const { Publisher, Book } = require('../models');

// List all publishers
exports.listPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.findAll({
            include: {
                model: Book,
                attributes: ['id']
            }
        });
        res.render('publishers/index', { publishers });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Render form to create a new publisher
exports.createPublisherForm = (req, res) => {
    res.render('publishers/create');
};

// Create a new publisher
exports.createPublisher = async (req, res) => {
    try {
        const { name, phone, country } = req.body;
        await Publisher.create({ name, phone, country });
        res.redirect('/publishers');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Render form to edit a publisher
exports.editPublisherForm = async (req, res) => {
    try {
        const publisher = await Publisher.findByPk(req.params.id);
        res.render('publishers/edit', { publisher });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Edit a publisher
exports.editPublisher = async (req, res) => {
    try {
        const { name, phone, country } = req.body;
        await Publisher.update({ name, phone, country }, {
            where: { id: req.params.id }
        });
        res.redirect('/publishers');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a publisher
exports.deletePublisher = async (req, res) => {
    try {
        await Publisher.destroy({ where: { id: req.params.id } });
        res.redirect('/publishers');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
