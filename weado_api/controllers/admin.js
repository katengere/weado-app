let Users = [
    { name: 'ndosy', password: 'ndosy123' },
    { name: 'win', password: 'win1234' }
];

function login(req, res) {
    const user = req.body;
    const found = Users.find(u => u.name === user.name && u.password === user.password);
    if (!found) {
        return res.status(404).json({ message: 'Sorry, No one found with that credentials' });
    }
    return res.status(200).json(found);
}

module.exports = login;