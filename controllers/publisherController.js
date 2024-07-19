
const { Publisher, Book } = require('../models');


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


exports.createPublisherForm = (req, res) => {
    res.render('publishers/create');
};

exports.createPublisher = async (req, res) => {
    try {
        const { name, phone, country } = req.body;
        await Publisher.create({ name, phone, country });
        res.redirect('/publishers');
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.editPublisherForm = async (req, res) => {
    try {
        const publisher = await Publisher.findByPk(req.params.id);
        res.render('publishers/edit', { publisher });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


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


exports.deletePublisher = async (req, res) => {
    try {
        await Publisher.destroy({ where: { id: req.params.id } });
        res.redirect('/publishers');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
