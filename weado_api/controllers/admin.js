const multer = require('multer');
const path = require('path');
const fs = require('fs');

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: (req, file, cb) => {
        if (process.env.production) {
            cb(null, '');
        } else {
            cb(null, path.join(__dirname + '../../../public/uploads/users'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

const store = multer({
    storage: imageStorage,
    limits: {
        fileSize: 3000000 // 1000000 Bytes = 3 MB
    },
    fileFilter(req, file, cb) {
        console.log('file filter method');
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/i)) {
            // upload only png and jpg format
            return cb('Please upload an Image');
        }
        cb(undefined, true);
    }
}).single('user_Img');

let Users = [
    { name: 'admin', password: 'weado2014' },
];

function login(req, res) {
    const user = req.body;
    const found = Users.find(u => u.name === user.name && u.password === user.password);
    if (!found) {
        return res.status(404).json({ message: 'Sorry, No one found with that credentials' });
    }
    return res.status(200).json(found);
}
const register = (req, res) => {
    store(req, res, (error) => {
        if (error) {
            console.log(error);
            return res.status(400).json(error);

        }
        if (!req.body.name || !req.body.password) {
            return res.status(400).json({ message: 'tafazali jaza fomu ya usajili kwa usahihi' });
        }
        const user = {};
        user.name = req.body.name;
        user.password = req.body.password;
        user.user_Img = `http://localhost:3000/uploads/users/${req.file.filename}`;
        console.log(user);
        Users.push(user);
        return res.status(201).json(user);
    });
};

module.exports = { login, register };