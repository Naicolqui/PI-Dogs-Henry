const { Router } = require('express');
const breedRoute = require('./breeds');
const temperRoute = require('./temper');

const router = Router();


router.use('/breeds', breedRoute);
router.use('/temper', temperRoute);


module.exports = router;
