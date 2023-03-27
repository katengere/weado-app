const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/indexCtrl');
/* GET home page. */
router.get('/', indexCtrl);

module.exports = router;