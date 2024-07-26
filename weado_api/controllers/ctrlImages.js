const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const Project = mongoose.model('Project');
const cloudinary = require('cloudinary').v2;

const ctrlGetImages = async (req, res) => {
    const images = await Image.find();
    res.status(200).json(images);
}

function ctrlAddImage(req, res) {
    const file = req.files.file;
    const filePath = path.join(__dirname + '/../../tmp/' + file.name);
    file.path = filePath;
    console.log(file);

    file.mv(filePath, (err) => {
        if (err) {
            console.log('Express loader mv method Error ', err);
            return res.status(400).json('file req obj not added');
        } else {
            cloudinary.uploader.upload(filePath, {
                public_id: file.name,
                folder: 'weado_Images'
            }).then(result => {
                console.log(result);
                const image = {
                    title: req.body.title,
                    imgDetails: file,
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
                                fs.unlink(filePath, (err) => {
                                    if (err) throw err;
                                    console.log(file.name + ' was deleted');
                                });
                                return res.status(400).json(err);
                            });
                    });
                }).catch(err => {
                    console.log(err);
                    fs.unlink(filePath, (err) => {
                        if (err) throw err;
                        console.log(file.name + ' was deleted');
                    });
                    return res.status(400).json(err);
                });
            }).
                catch(err => {
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
    ctrlGetImages,
    ctrlAddImage,
    ctrlDeleteImage
};