require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const mongoose = require('mongoose');

/**
 * Routers
 */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const passportRouter = require('./routes/passport');
const registerRouter = require('./routes/register');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();
require('./passport');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

/**
 * Add routers to experss
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/passport', passportRouter);
app.use('/api/register', registerRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);


/**
 * Errors hadeling
 */
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
    if(err.name == 'MongoError' || err.name == 'ValidationError' || err.name == 'CastError'){
        err.status = 422;
    }
    res.status(err.status || 500).json({message: err.message || "some error occurred."});
});

/**
 * Connect to mongodb
 */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
    if(err) throw err;
    console.log('Connected successfully');
});

module.exports = app;