const express = require('express');
const router = express.Router();
const addOrderRoute = require('./order');
const addDeliveryCommission = require('./commission')
const ware = require('./ware');

router.use('/order', addOrderRoute);
router.use('/commission', addDeliveryCommission);
router.use('/ware',ware);
module.exports = router;


