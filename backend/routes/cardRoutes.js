const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController'); 

router.post('/', cardController.createCard);
router.delete('/:id', cardController.deleteCard); 
router.patch('/:cardId/move', cardController.moveCard);
module.exports = router;