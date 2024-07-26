const express = require('express');
const router = express.Router();
const ctrlAdmin = require('../controllers/admin');
const ctrlProjects = require('../controllers/ctrlProjects');
const { ctrlAddReport, ctrlDeleteReport, ctrlGetAllReports } = require('../controllers/ctrlReports');
const { ctrlAddActivities, ctrlDeleteActivity, ctrlUpdateActivity, ctrlGetActivities } = require('../controllers/ctrlActivities');
const { ctrlAddImage, ctrlDeleteImage, ctrlGetImages } = require('../controllers/ctrlImages');
const { ctrlAddMessage, ctrlGetAllMessage } = require('../controllers/ctrlMessage');

/* Projects. */
router.route('/projects')
  .get(ctrlProjects.ctrlProjects)
  .post(ctrlProjects.ctrlAddProject);
// router.get('/projects/summary/:year', ctrlProjects.ctrlProjectSummary);
router.route('/project/:_id')
  .get(ctrlProjects.ctrlProjectDetails)
  .put(ctrlProjects.ctrlProjectUpdate)
  .delete(ctrlProjects.ctrlDeleteProject);

// Admins Auth
// router.post('/admin/register', ctrlAdmin.register);
router.post('/users/login', ctrlAdmin.login);

// Admin Projects CRUD
router.delete('/admin/manage/delete/:_id', ctrlProjects.ctrlDeleteProject);

// Admin Report CRUD
router.route('/reports').get(ctrlGetAllReports).post(ctrlAddReport);
router.delete('/reports/:_id', ctrlDeleteReport);

// Admin Image CRUD
router.get('/images', ctrlGetImages);
router.post('/admin/manage/image/add', ctrlAddImage);
router.delete('/admin/manage/image/delete/:_id', ctrlDeleteImage);

// Admin Activities CRUD
router.route('/activities')
  .get(ctrlGetActivities)
  .post(ctrlAddActivities);

router.route('/activities/:activityId')
  .put(ctrlUpdateActivity)
  .delete(ctrlDeleteActivity);

// Messages CRUD
router.route('/messages')
  .get(ctrlGetAllMessage)
  .post(ctrlAddMessage);

module.exports = router;