const { Router } = require('express');
const breedRoute = require('./breeds');
const temperRoute = require('./tempers');

const router = Router();


router.use('/breeds', breedRoute);
router.use('/tempers', temperRoute);


module.exports = router;
