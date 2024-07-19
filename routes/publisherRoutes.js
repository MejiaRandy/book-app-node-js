// routes/publisherRoutes.js
const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisherController');

// List all publishers
router.get('/', publisherController.listPublishers);

// Form to create a new publisher
router.get('/create', publisherController.createPublisherForm);

// Create a new publisher
router.post('/create', publisherController.createPublisher);

// Form to edit a publisher
router.get('/edit/:id', publisherController.editPublisherForm);

// Edit a publisher
router.post('/edit/:id', publisherController.editPublisher);

// Delete a publisher
router.get('/delete/:id', publisherController.deletePublisher);

module.exports = router;
