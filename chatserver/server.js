const express = require('express');
const connect = require('./schemas');
const app = express();
const port = 8000;
connect();
const userapi = require('./api/user');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userapi);

//app.get('/', (req, res) => res.json({ data: 'test', kkkrt: '인생너무빡샘' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
