require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('./weado_api/models/db');

const indexRouter = require('./weado_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './weado_api/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 3000000 },
    abortOnLimit: true,
    preserveExtension: true
}));
app.use(express.static(path.join(__dirname, './temp')));


app.use(express.static(path.join(__dirname, './weado_ui/build')));

app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/api', indexRouter);
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'weado_ui', 'build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;