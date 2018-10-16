const contact = require('./contact.js');
const express = require('express');
const router = express.Router();

router.use('/contact', contact);

module.exports = router;
