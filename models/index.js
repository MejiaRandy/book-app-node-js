const sequelize = require('../config/config');
const Book = require('./book');
const Category = require('./category');
const Author = require('./author');
const Publisher = require('./publisher');

Book.belongsTo(Category);
Book.belongsTo(Author);
Book.belongsTo(Publisher);

sequelize.sync();

module.exports = {
    Book,
    Category,
    Author,
    Publisher
};