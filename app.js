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
require('./config/passport');
// const { createServer } = require("http");
// const { Server } = require("socket.io");
const eiows = require("eiows")
const app = express();
// const httpServer = createServer(app);

const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
    }
}
);




// httpServer.listen(8080, () => {
//     console.log("Listening on 8080");
// });

// app.get("/talk", (req, res) => { res.send('Hello world')});

// const io = new Server(httpServer)


// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//       });
//   });

// io.on('connection', function (socket) {
//     console.log('client connected: ', socket.id);
//     socket.on('disconnect', function (reason) {
//         console.log('User Disconnected, ', reason);
//     });

//     socket.join("nutella-room");
//     socket.on('example_message', function (msg) {
//         console.log('message: ' + msg);
//     });
// });
// io.listen(8080);
// react on local host 3000 (front end)
//socket = io.connect( local host 4000) (front end)

//const server = http.createServer(app); BACK END ON 4000
//// server.listen(4000, () => 'Server is running on port 4000');

// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000',  IN BACK END. allowong from coors FROM the front end local host
//         methods: ['GET', 'POST'],


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize());

const { isProduction } = require('./config/keys');


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


io.on('connection', (socket) => {
    console.log("Un utilisateur s'est connecté au chat");
    socket.on('disconnect', () => {
        console.log("Un utilisateur s'est déconnecté du chat");
    });
    socket.on("message de chat", (msg) => {
        io.emit("message de chat", msg);
    })

});


io.listen(8080, () => {
    console.log("Listening on *:8080");
})

// app.listen(8080, () => {
//     console.log("Listening on *:8080");
// })

// server.listen(8080, () => {
//     console.log("Listening on *:8080");
// })


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
