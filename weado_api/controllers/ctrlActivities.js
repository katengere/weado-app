const mongoose = require('mongoose');
const Project = mongoose.model('Project');

const ctrlAddActivities = (req, res) => {
    Project.findByIdAndUpdate(req.params._id).select('title activities').
    then(project => {
        req.body.activities.forEach(act => project.activities.push(act));
        console.log('updated project ', project);
        project.save().
        then(result => res.status(201).json(result)).
        catch(err => res.status(400).json(err));
    }).
    catch(err => res.status(404).json(err));
};
const ctrlUpdateActivity = (req, res) => {

};
const ctrlDeleteActivity = (req, res) => {

};

module.exports = {
    ctrlAddActivities,
    ctrlUpdateActivity,
    ctrlDeleteActivity
};