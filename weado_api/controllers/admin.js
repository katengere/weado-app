const multer = require('multer');
const path = require('path');
const fs = require('fs');

let Users = [
    { name: 'admin', password: 'weado2014' },
];

function login(req, res) {
    const user = req.body;
    console.log('user ', user);

    const found = Users.find(u => u.name === user.name && u.password === user.password);
    if (!found) {
        return res.status(404).json({ message: 'Sorry, No one found with that credentials' });
    }
    return res.status(200).json(found);
}
const register = (req, res) => {

    if (!req.body.name || !req.body.password) {
        return res.status(400).json({ message: 'tafazali jaza fomu ya usajili kwa usahihi' });
    }
    const user = {};
    user.name = req.body.name;
    user.password = req.body.password;
    // user.user_Img = `http://localhost:3000/uploads/users/${req.file.filename}`;
    console.log(user);
    Users.push(user);
    return res.status(201).json(user);
};

module.exports = { login, register };