const express = require('express');
const router = express.Router();
const { createList } = require('../controllers/listController');

router.route('/').post(createList);

module.exports = router;