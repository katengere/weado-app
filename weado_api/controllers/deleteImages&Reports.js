const fs = require('fs');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
const Report = mongoose.model('Report');
const cloudinary = require('cloudinary').v2;

function unlinkImageFiles(id) {
    console.log('unlinkImage function called');
    return Promise.resolve(Image.find({ projectId: id }).then(images => {
        if (images.length >= 1) {
            images.forEach(image => {
                cloudinary.uploader.destroy(image.public_id).then(result => {
                    console.log('Cloudinary destroy result ', result);
                    fs.unlink(image.imgDetails.path, (err) => {
                        if (err) {
                            console.log('Error deleting file ', err);
                            throw err;
                        }
                        console.log(image.imgDetails.name + ' was deleted');
                    });
                }).catch(err => Promise.reject(err));
                console.log('delete and unlinked image ', image.title);
            });
            return 'Deleted ' + images.length + ' Images';
        }
        return 'No images for this project';
    }));
}

function unlinkReportFiles(id) {
    console.log('unlinkREPORT function called');

    return Promise.resolve(Report.find({ projectId: id }).then(reports => {
        if (reports.length >= 1) {
            reports.forEach(report => {
                fs.unlink(report.rFile.path, (err) => {
                    if (err) {
                        console.log('Error deleting file ', err);
                        throw err;
                    }
                    console.log(report.rFile.name + ' was deleted');
                });
                console.log('deleted report ', report.title);
            });
            return 'Deleted ' + reports.length + ' Reports';
        }
        return 'No reports for this project';
    }));
}

module.exports = { unlinkImageFiles, unlinkReportFiles };