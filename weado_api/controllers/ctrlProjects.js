const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Image = mongoose.model('Image');
const Report = mongoose.model('Report');
const cloudinary = require('cloudinary').v2;
const { unlinkImageFiles, unlinkReportFiles } = require('./deleteImages&Reports');
const fileUrl = `http://localhost:3000/uploads/projects/`;
console.log(process.env.production);

const storage = multer.diskStorage({
    // Destination to store image     
    destination: (req, file, cb) => {
        if (process.env.production) {
            cb(null, '/temp');
        } else {
            cb(null, path.join(__dirname + '../../../public/uploads/projects'));
        }

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
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
}).single('fileDoc');

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
    upload(req, res, (err) => {
        if (err) {
            console.log('Error uploading file, ', err);
            return res.status(400).json(err);
        }
        if (req.file) {
            req.file.fileUrl = `${fileUrl}${req.file.filename}`;
            console.log('Authors ', req.body.author);

            const project = {
                author: req.body.author.split(','),
                title: req.body.title,
                fileDoc: req.file,
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
                fs.unlink(req.file.path, (err) => {
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