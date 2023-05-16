const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const fileUrl = `http://localhost:3000/uploads/projects/`;
// const { projects, reports } = require('../models/projects');
// const { Gr_idFsStorage } = require('multer-gr_idfs-storage');

// const store = new Gr_idFsStorage({
//     url: process.env.dbUrl,
//     file: (req, file) => {
//         return file.originalname + '_' + Date.now() + path.extname(file.originalname);
//     }
// });
const storage = multer.diskStorage({
    // Destination to store image     
    destination: path.join(__dirname + '../../../public/uploads/projects'),
    filename: (req, file, cb) => {
        console.log('imagestorage log ' + file.fieldname + '_' + Date.now() + path.extname(file.originalname));

        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname));
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
}).single('files');

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
            const project = {
                author: req.body.author,
                title: req.body.title,
                summary: req.body.summary,
                date: req.body.date,
                activities: req.body.activities
            };
            project.files = [];
            project.files.push(req.file);
            console.log(project);

            // Project.create(project).
            // then(response => { console.log(response); return res.status(201).json(response); }).
            // catch(err => {
            //     console.log(err);
            //     const filePath = `${__dirname}/../../public/uploads/projects/${req.file.filename}`;
            //     console.log(filePath);
            //     fs.unlink(filePath, (err) => {
            //         if (err) throw err;
            //         console.log(req.file.filename + ' was deleted');
            //     });
            //     return res.status(400).json(err);
            // });
        } else {
            res.status(400).json('file req obj not added');
        }
    });
}

function ctrlDeleteProject(req, res) {
    const _id = req.params._id;
    Project.findByIdAndDelete(_id).
    then(result => {
        console.log(result);
        return res.status(202).json('Successfully removed ' + result.title);
    }).
    catch(err => {
        console.log(err);
        res.status(404).json('Sorry, project Not Deleted ' + err);
    });
}
module.exports = {
    ctrlProjects,
    ctrlProjectDetails,
    ctrlAddProject,
    ctrlDeleteProject,
    ctrlProjectSummary
};