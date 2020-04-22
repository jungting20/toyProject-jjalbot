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
app.use(cors());

const userapi = require('./api/user');
const roomapi = require('./api/room');
const chatapi = require('./api/chat');
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userapi);
app.use(jwtMiddleware);
app.use('/room', roomapi);
app.use('/chat', chatapi);

//app.get('/', (req, res) => res.json({ data: 'test', kkkrt: '인생너무빡샘' }));

const server = app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
webSocket(server, app);
