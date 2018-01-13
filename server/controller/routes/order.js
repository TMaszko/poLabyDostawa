const express = require('express');
const router = express.Router();
const OrderController = require('../OrderController');

router.get('/', OrderController.getAddOrder);
router.post('/', OrderController.addOrder);


module.exports = router;
