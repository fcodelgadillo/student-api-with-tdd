const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;
const StudentController = require('./modules/student/student.module')().StudentController;



const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
MongoDBUtil.init();
app.use('/students', StudentController);

// catch on 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   //render the error page
    res.status(err.status || 500);
    res.json({
        message: res.locals.message,
        error: res.locals.error
    })
});


app.get('/', (req, res)=> {
    const pkg = require(path.join(__dirname, 'package.json'));
    res.json({
        name: pkg.name,
        version: pkg.version,
        status: 'up'
    });
});

module.exports = app;
