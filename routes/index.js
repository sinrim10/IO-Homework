var express = require('express');
var router = express.Router();
const index_ctrl = require('../controller/index_controller');

/* GET home page. */
router.get('/', index_ctrl.crawler);

module.exports = router;
