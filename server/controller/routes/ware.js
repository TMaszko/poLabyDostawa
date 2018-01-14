const express = require('express');
const router = express.Router();
const WareController = require('../WareController');

router.get('/', WareController.getAll);
router.get('/:deliverer', WareController.getDelivererWares);


module.exports = router;
