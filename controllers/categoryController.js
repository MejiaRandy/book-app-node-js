const { Category, Book } = require('../models');

exports.listCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: Book,
                attributes: ['id']
            }
        });
        res.render('categories/index', { categories });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createCategoryForm = (req, res) => {
    res.render('categories/create');
};

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        await Category.create({ name, description });
        res.redirect('/categories');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.editCategoryForm = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        res.render('categories/edit', { category });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.editCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        await Category.update({ name, description }, {
            where: { id: req.params.id }
        });
        res.redirect('/categories');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.destroy({ where: { id: req.params.id } });
        res.redirect('/categories');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
