const mongoose = require("mongoose");
require("./models/User")
require("./models/Confessions")

require("./models/Topics")
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const debug = require('debug');
const csurf = require('csurf');
const passport = require('passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/users');
const confessionsRouter = require('./routes/api/confessions');
const csrfRouter = require('./routes/api/csrf');
const http = require("http")
const chatsRouter = require("./routes/api/chats")
const messageRoutes = require("./routes/api/messages")
const topicsRouter = require('./routes/api/topics');

require('./config/passport');
// const { createServer } = require("http");
// const { Server } = require("socket.io");
const eiows = require("eiows")
const app = express();
// const httpServer = createServer(app);

const { Server } = require("socket.io");


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
    }
}
);





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize());

const { isProduction } = require('./config/keys');
const { createSocket } = require('dgram');


if(!isProduction) {
    app.use(cors());
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);

app.use('/api/chats', chatsRouter)
app.use('api/messages', messageRoutes)
app.use('/api/confessions', confessionsRouter);
app.use('/api/topics', topicsRouter);


app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
});


const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});

module.exports = app;
