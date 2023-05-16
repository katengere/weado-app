const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const Project = mongoose.model('Project');
const fileUrl = `http://localhost:3000/uploads/images/`;

const storage = multer.diskStorage({
    destination: path.join(__dirname + '../../../public/uploads/images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3000000 // 1000000 Bytes = 3 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/i)) {
            // upload only png and jpg format
            return cb('Please upload an image file');
        }
        cb(undefined, true);
    }
}).single('file');

function ctrlAddImage(req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log('Error uploading file, ', err);
            return res.status(400).json(err);
        }
        if (req.file) {
            req.file.fileUrl = `${fileUrl}${req.file.filename}`;
            const image = {
                title: req.body.title,
                description: req.body.description,
                file: req.file,
                projectId: req.body.projectId,
                fileUrl: req.file.fileUrl
            };
            Image.create(image).
            then(image => {
                Project.findById(image.projectId).select('images').then(project => {
                    project.images.push(image._id);
                    project.save().
                    then(proj => res.status(201).json(proj)).
                    catch(err => res.status(400).json(err));
                });
            }).
            catch(err => {
                console.log(err);
                console.log(req.file.path);
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

module.exports = {
    ctrlAddImage
};