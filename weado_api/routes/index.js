const express = require('express');
const router = express.Router();
const ctrlIndex = require('../controllers/ctrlIndex');
const ctrlAdmin = require('../controllers/admin');
var ctrlProjects = require('../controllers/ctrlProjects');


/* GET home page. */
router.get('/', ctrlIndex);

/* GET users listing. */
router.get('/projects', ctrlProjects.ctrlProjects);
router.get('/projects/:year', ctrlProjects.ctrlProject);
router.post('/admin', ctrlAdmin);

module.exports = router;