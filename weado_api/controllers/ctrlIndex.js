function indexCtrl(req, res, next) {
    res.render('index', { title: 'Express' });
}
module.exports = indexCtrl;