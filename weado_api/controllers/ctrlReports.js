const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Report = mongoose.model('Report');
const Project = mongoose.model('Project');
const fileUrl = `http://localhost:3000/`;

function ctrlAddReport(req, res) {
    const file = req.files.rFile;
    if (file) {
        const report = {
            author: req.body.author,
            title: req.body.title,
            summary: req.body.summary,
            rFile: file,
            projectId: req.body.projectId,
            fileUrl: `${fileUrl}${file.name}`
        };

        Report.create(report).then(response => {
            Project.findById(report.projectId).select('reportsId').then(project => {
                project.reportsId.push(response._id);
                project.save().
                then(proj => res.status(201).json(proj)).
                catch(err => res.status(400).json(err));
            });
        }).catch(err => {
            console.log(err);
            console.log(file.tempFilePath);
            fs.unlink(file.tempFilePath, (err) => {
                if (err) throw err;
                console.log(file.name + ' was deleted');
            });
            return res.status(400).json(err);
        });
    } else {
        res.status(400).json('file req obj not added');
    }
}

const ctrlDeleteReport = (req, res) => {
    const _id = req.params._id;
    Report.findByIdAndDelete(_id).then(report => {
        Project.findById(report.projectId).then(project => {
            project.reportsId = project.reportsId.filter(id => id.toString() !== report._id.toString());
            project.save().then(proj => {
                console.log('Saved project ', proj.title);
                fs.unlink(report.rFile.tempFilePath, (err) => {
                    if (err) {
                        console.log('Error deleting file ', err);
                        throw err;
                    }
                    console.log(report.rFile.tempFilePath + ' was deleted');
                });
                res.status(204).json(report);
            }).catch(err => {
                console.log('ERR Saving Proj', err);
            });
        }).catch(err => {
            console.log('Error finding Project ', err);
        });
    }).catch(err => {
        console.log(err);
        return res.status(400).json(err);
    });
};

module.exports = {
    ctrlAddReport,
    ctrlDeleteReport
};