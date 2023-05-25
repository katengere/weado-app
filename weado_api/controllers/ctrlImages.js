const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const Project = mongoose.model('Project');
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (process.env.production) {
            cb(null, '');
        } else {
            cb(null, path.join(__dirname + '../../../public/uploads/images'));
        }
    },
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
            console.log(req.file);
            cloudinary.uploader.upload(req.file.path, {
                public_id: req.file.filename,
                folder: 'weado_Images'
            }).then(result => {
                console.log(result);
                const image = {
                    title: req.body.title,
                    imgDetails: req.file,
                    description: req.body.description,
                    imgUrl: result.url,
                    public_id: result.public_id,
                    projectId: req.body.projectId
                };

                Image.create(image).then(image => {
                    Project.findById(image.projectId).select('images').then(project => {
                        project.images.push(image._id);
                        project.save().then(proj => res.status(201).json(image)).
                        catch(err => {
                            fs.unlink(req.file.path, (err) => {
                                if (err) throw err;
                                console.log(req.file.filename + ' was deleted');
                            });
                            return res.status(400).json(err);
                        });
                    });
                }).catch(err => {
                    console.log(err);
                    console.log(req.file.path);
                    fs.unlink(req.file.path, (err) => {
                        if (err) throw err;
                        console.log(req.file.filename + ' was deleted');
                    });
                    return res.status(400).json(err);
                });
            }).
            catch(err => {
                console.log(err);
                fs.unlink(req.file.path, (err) => {
                    if (err) throw err;
                    console.log(req.file.filename + ' was deleted');
                });
                if (err.error.code === 'ENOTFOUND') {
                    err.message = 'No internet connection';
                    return res.status(404).json(err);
                }
                return res.status(400).json(err);
            });
        } else {
            res.status(400).json('file req obj not added');
        }
    });
}

function ctrlDeleteImage(req, res) {
    const _id = req.params._id;
    Image.findByIdAndDelete(_id).then(image => {
        console.log(image);

        cloudinary.uploader.destroy(image.public_id).then(result => {
            console.log('cloudinary result ', result);
            fs.unlink(image.imgDetails.path, (err) => {
                if (err) {
                    console.log('Error deleting file ', err);

                    throw err;
                }
                console.log(image.imgDetails.filename + ' was deleted');
            });
            Project.findById(image.projectId).select('images').then(project => {
                project.images = project.images.filter(id => id.toString() !== _id.toString());
                project.save().then(proj => {
                    return res.status(204).json(image);
                }).catch(err => {
                    console.log('Error saving project ', err);
                    return res.status(400).json(err);
                });
            }).catch(err => res.status(400).json(err));
        }).catch(err => {
            console.log('CLOUDINARY ERROR: ', err);
            if (err.error.code === 'ENOTFOUND') {
                err.message = 'No internet connection';
                return res.status(404).json(err);
            }
            return res.status(400).json(err);
        });
    }).catch(err => {
        console.log(err);
        err.error.message = 'Sorry, Image Not Deleted';
        return res.status(404).json(err);
    });
}

module.exports = {
    ctrlAddImage,
    ctrlDeleteImage
};