const express = require('express');
const router = express.Router();
const ctrlAdmin = require('../controllers/admin');
const ctrlProjects = require('../controllers/ctrlProjects');
const { ctrlAddReport, ctrlDeleteReport } = require('../controllers/ctrlReports');
const { ctrlAddActivities, ctrlDeleteActivity, ctrlUpdateActivity } = require('../controllers/ctrlActivities');
const { ctrlAddImage, ctrlDeleteImage } = require('../controllers/ctrlImages');

/* Projects. */
router.get('/projects', ctrlProjects.ctrlProjects);
router.get('/projects/summary/:year', ctrlProjects.ctrlProjectSummary);
router.get('/projects/details/:_id', ctrlProjects.ctrlProjectDetails);

// Admins Auth
// router.post('/admin/register', ctrlAdmin.register);
router.post('/admin/login', ctrlAdmin.login);

// Admin Projects CRUD
router.post('/admin/manage/add', ctrlProjects.ctrlAddProject);
router.delete('/admin/manage/delete/:_id', ctrlProjects.ctrlDeleteProject);

// Admin Report CRUD
router.post('/admin/manage/report/add', ctrlAddReport);
router.delete('/admin/manage/report/delete/:_id', ctrlDeleteReport);

// Admin Image CRUD
router.post('/admin/manage/image/add', ctrlAddImage);
router.delete('/admin/manage/image/delete/:_id', ctrlDeleteImage);

// Admin Activities CRUD
router.post('/admin/manage/activity/add/:_id', ctrlAddActivities);
router.delete('/admin/manage/activity/delete/:_id/:activity', ctrlDeleteActivity);



module.exports = router;