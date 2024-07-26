const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Activity = mongoose.model('Activity');

const ctrlGetActivities = async (req, res) => {
    const activities = await Activity.find();
    res.status(200).json(activities);
}

const ctrlAddActivities = async (req, res) => {
    const activity = {
        title: req.body.title,
        description: req.body.description,
        activityReport: req.body.activityReport,
        budget: req.body.budget,
        images: req.body.images,
        projectId: req.body.projectId,
        createdOn: req.body.createdOn,
        modifiedOn: req.body.modifiedOn,
    }
    const newAct = await Activity.create(activity);
    const project = await Project.findByIdAndUpdate(activity.projectId).select('title activities');
    project.activities.push(newAct._id);
    project.save().
        then(result => res.status(201).json(result)).
        catch(err => res.status(400).json(err));
    // then(project => {
    //     req.body.activities.forEach(act => project.activities.push(act));
    //     console.log('updated project ', project);
    // project.save().
    // then(result => res.status(201).json(result)).
    // catch(err => res.status(400).json(err));
    // }).catch(err => res.status(404).json(err));
};
const ctrlUpdateActivity = async (req, res) => {
    const activity = await Activity.findByIdAndUpdate(req.params.activityId, req.body);
    console.log('updated document ', activity);
    res.status(201).json(activity);
};
const ctrlDeleteActivity = async (req, res) => {
    try {
        const project = await Project.findOne({ 'activities': req.params.activityId }).select('activities');
        if (!project) return await Promise.reject('No project found');
        const activity = await Activity.findByIdAndDelete(req.params.activityId);
        const index = project.activities.findIndex(id => id.toString() === req.params.activityId);
        project.activities.splice(index, 1);
        const response = await project.save();
        res.status(201).json(response);
    } catch (error) {
        console.log('err ', error);
        res.status(400).json(error);
    }

    // Project.findByIdAndUpdate(req.params._id).select('activities').then(project => {
    //     project.activities = project.activities.filter(activity => activity != req.params.activity);
    //     project.save().then(result => res.status(201).json(result)).catch(err => res.status(400).json(err));
    // }).catch(err => res.status(404).json(err));
};

module.exports = {
    ctrlGetActivities,
    ctrlAddActivities,
    ctrlUpdateActivity,
    ctrlDeleteActivity
};