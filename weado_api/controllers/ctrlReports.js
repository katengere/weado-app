const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Report = mongoose.model('Report');
const Project = mongoose.model('Project');
const fileUrl = `http://localhost:3000/public/uploads/reports/`;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (process.env.production) {
            cb(null, '');
        } else {
            cb(null, path.join(__dirname + '../../../public/uploads/reports'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3000000 // 1000000 Bytes = 3 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf|excel)$/i)) {
            // upload only png and jpg format
            return cb('Please upload a document(pdf or doc)');
        }
        cb(undefined, true);
    }
}).single('rFile');

function ctrlAddReport(req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log('Error uploading file, ', err);
            return res.status(400).json(err);
        }
        if (req.file) {
            req.file.fileUrl = `${fileUrl}${req.file.filename}`;
            const report = {
                author: req.body.author,
                title: req.body.title,
                summary: req.body.summary,
                rFile: req.file,
                projectId: req.body.projectId,
                fileUrl: req.file.fileUrl
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
                const filePath = `${__dirname}/../../public/uploads/reports/${req.file.filename}`;
                console.log(filePath);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log(req.file.filename + ' was deleted');
                });
                return res.status(400).json(err);
            });
        } else {
            res.status(400).json('file req obj not added');
        }
    });
}

const ctrlDeleteReport = (req, res) => {
    const _id = req.params._id;
    Report.findByIdAndDelete(_id).then(report => {
        Project.findById(report.projectId).then(project => {
            project.reportsId = project.reportsId.filter(id => id.toString() !== report._id.toString());
            project.save().then(proj => {
                console.log('Saved project ', proj.title);
                fs.unlink(report.rFile.path, (err) => {
                    if (err) {
                        console.log('Error deleting file ', err);
                        throw err;
                    }
                    console.log(report.rFile.filename + ' was deleted');
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