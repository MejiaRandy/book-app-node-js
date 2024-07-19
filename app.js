const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(session({
    secret: 'bookappsecret',
    resave: false,
    saveUninitialized: true,
}));

// Routes
const indexRoutes = require('./routes/index');
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authorRoutes = require('./routes/authorRoutes');
const publisherRoutes = require('./routes/publisherRoutes');

app.use('/', indexRoutes);
app.use('/books', bookRoutes);
app.use('/categories', categoryRoutes);
app.use('/authors', authorRoutes);
app.use('/publishers', publisherRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
