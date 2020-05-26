require('dotenv').config();
const express = require('express');
const connect = require('./schemas');
const cookieparser = require('cookie-parser');
const { jwtMiddleware } = require('./middleware/jwtmiddleware.js');
const webSocket = require('./socket');
const app = express();
const port = process.env.port || 4000;
const cors = require('cors');
//const { handleError } = require('./lib/CustomError');
connect();
/* app.use(
    cors({
        credentials: true,
    })
); */

const userapi = require('./api/user');
const roomapi = require('./api/room');
const chatapi = require('./api/chat');
app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type'
    );
    res.header('Access-Control-Allow-Credentials', true);
    next();
    return;
});
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jwtMiddleware);
app.use('/user', userapi);
app.use('/room', roomapi);
app.use('/chat', chatapi);

const server = app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
webSocket(server, app);
