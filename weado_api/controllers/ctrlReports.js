const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { log } = require('console');
const Report = mongoose.model('Report');
const Project = mongoose.model('Project');
const fileUrl = `http://localhost:3000/`;

const ctrlGetAllReports = async (req, res) => {
    const reports = await Report.find();
    if (reports !== undefined) {
        res.status(200).json(reports);
    } else {
        res.status(404).json('Reports unavailable, try again later');
    }
}

async function ctrlAddReport(req, res) {
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
        try {
            const newReport = await Report.create(report);
            const project = await Project.findById(newReport.projectId).select('reportsId');
            project.reportsId.push(newReport._id);
            const savedProject = await project.save();
            if (savedProject.reportsId.find(id => id.toString() == newReport._id.toString()) !== undefined) {
                console.log('saved project reports ', savedProject.reportsId.length);
                res.status(201).json(newReport);
            } else {
                const report = await Report.findByIdAndDelete(newReport._id);
                throw Error('Sorry, Unable to save the report ' + report.title);
            }
        } catch (error) {
            console.log('error saving proj report ', error);
            res.status(400).json(error);
        }
    } else {
        res.status(400).json('file req obj not added');
    }
}

const ctrlDeleteReport = async (req, res) => {
    const _id = req.params._id;
    try {
        const report = await Report.findByIdAndDelete(_id);
        const project = await Project.findById(report.projectId);
        console.log('found project reports ', project.reportsId.length);
        project.reportsId = project.reportsId.filter(id => id.toString() !== report._id.toString());
        const savedProject = await project.save();
        console.log('saved project reports ', savedProject.reportsId.length);
        res.status(204).json(report);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    ctrlAddReport,
    ctrlDeleteReport,
    ctrlGetAllReports
};