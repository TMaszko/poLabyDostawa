const express = require('express');
const router = express.Router();
const addOrderRoute = require('./order');
// const addDeliveryCommission = require('./commision')

router.use('/order', addOrderRoute);


module.exports = router;


