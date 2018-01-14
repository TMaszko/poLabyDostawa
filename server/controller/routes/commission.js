const express = require('express');
const router = express.Router();
const CommissionController = require('../CommissionController');

router.get('/', CommissionController.getAddCommissionDeliverers);
router.post('/', CommissionController.addCommission);


module.exports = router;
