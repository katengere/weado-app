const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Image = mongoose.model('Image');
const Report = mongoose.model('Report');
const cloudinary = require('cloudinary').v2;
const { unlinkImageFiles, unlinkReportFiles } = require('./deleteImages&Reports');
const fileUrl = `http://localhost:3000/`;

function ctrlProjects(req, res, next) {
    Project.find({}, {}, { sort: { date: 1 } }).
    then((result) => res.status(200).json(result)).
    catch(err => {
        console.log(err);
        return res.status(400).json(err);
    });
}

function ctrlProjectSummary(req, res, next) {
    const year = req.params.year;
    const projectsList = ProjectsData.filter(project => new Date(project.date).getFullYear() == year);
    res.status(200).json(projectsList);
}

function ctrlProjectDetails(req, res, next) {
    const _id = req.params._id;
    Project.findById(_id).populate(['reportsId', 'images']).
    then(result => res.status(200).json(result)).
    catch(err => res.status(404).json(`Project does not exist: ${err}`));
}

function ctrlAddProject(req, res) {
    const file = req.files.fileDoc;
    const filePath = path.join(__dirname + '/../../tmp/' + file.name);
    console.log(filePath);
    file.path = filePath;
    console.log(file);
    file.mv(filePath, (err) => {
        if (err) {
            console.log('Express loader mv method Error ', err);
            return res.status(400).json('file req obj not added');
        } else {
            cloudinary.uploader.upload(filePath, {
                public_id: file.name,
                resource_type: 'auto',
                folder: 'weado_Projects'
            }).then(result => {
                console.log(result);

                file.fileUrl = result.url;
                const project = {
                    author: req.body.author.split(','),
                    title: req.body.title,
                    fileDoc: file,
                    summary: req.body.summary,
                    date: req.body.date,
                    activities: req.body.activities
                };
                console.log(project);
                Project.create(project).then(response => {
                    console.log(response);
                    return res.status(201).json(response);
                }).catch(err => {
                    console.log(err);
                    fs.unlink(filePath, (err) => {
                        if (err) throw err;
                        console.log(file.name + ' was deleted');
                    });
                    return res.status(400).json(err);
                });
            }).catch(err => {
                console.log('cloudinary errror ', err);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log(file.name + ' was deleted');
                });
                if (err.error.code === 'ENOTFOUND') {
                    err.message = 'No internet connection';
                    return res.status(404).json(err);
                }
                return res.status(400).json(err);
            });
        }
    });
}

function ctrlDeleteProject(req, res) {
    const _id = req.params._id;
    Promise.all([
        unlinkReportFiles(_id), unlinkImageFiles(_id),
        Report.deleteMany({ projectId: _id }), Image.deleteMany({ projectId: _id })
    ]).then(values => {
        console.log(values);
        Project.findByIdAndDelete(_id).then(project => {
            fs.unlink(project.fileDoc.path, (err) => {
                if (err) {
                    console.log('Error deleting file ', err);
                    throw err;
                }
                console.log(project.fileDoc.filename + ' was deleted');
            });

            return res.status(204).json('Successfully removed ' + project.title);
        }).
        catch(err => {
            console.log(err);
            err.message = 'Sorry, project Not Deleted';
            res.status(404).json(err);
        });
    }).catch(err => console.log(err));

}

module.exports = {
    ctrlProjects,
    ctrlProjectDetails,
    ctrlAddProject,
    ctrlDeleteProject,
    ctrlProjectSummary,
};